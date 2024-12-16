const ComplianceCheck = require('../models/ComplianceCheck');
const ComplianceCheckParameter = require('../models/ComplianceCheckParameter');
const UserComplianceCheck = require('../models/UserComplianceCheck');
const mensualTimetableController = require('./mensualTimetableController');
const MensualTimetableSheet = require('../models/MensualTimetableSheet');
const DailyTimetableSheet = require('../models/DailyTimetableSheet');
const TimeSlot = require('../models/TimeSlot');
const { Op } = require('sequelize'); 

const complianceCheckController = {
  getComplianceChecks: async (req, res) => {
    try {
      const complianceChecks = await ComplianceCheck.findAll(
        {
          include: [
            {
              model: ComplianceCheckParameter,
              as: 'parameters',
            },
          ],
        },
      );
      return res.status(200).json(complianceChecks);
    } catch (error) {
      console.error('Error fetching ComplianceChecks:', error);
      return res.status(500).json({ message: 'Error fetching ComplianceChecks', error });
    }
  },

  complianceCheckForUser: async (req, res) => {
    try {
      const { id_user, id_timetable } = req.params;
      const userComplianceChecks = await UserComplianceCheck.findAll({
        where: { id_user },
        include: [
          {
            model: ComplianceCheck,
            as: 'complianceChecks',
            include: [
              {
                model: ComplianceCheckParameter,
                as: 'parameters',
              },
            ],
          },
        ],
      });
      return res.status(200).json(userComplianceChecks);
    } catch (error) {
      console.error('Error fetching UserComplianceChecks:', error);
      return res.status(500).json({ message: 'Error fetching UserComplianceChecks', error });
    }
  }

 };


 const checkEachRule = async (id_user, id_timetable) => {
  console.log('Checking compliance rules for user:', id_user, 'timetable:', id_timetable);
  const mensualTimetable = await MensualTimetableSheet.findOne({
    where: { id_timetable, id_user },
    include: [
      {
        model: DailyTimetableSheet,
        as: 'dailyTimetables',
        include: [
          {
            model: TimeSlot,
            as: 'timeSlots',
          },
        ],
      },
    ],
  });

  if (!mensualTimetable) {
    console.error('Mensual timetable not found.');
    return;
  }

  const userComplianceChecks = await UserComplianceCheck.findAll({
    where: { id_user },
    include: [
      {
        model: ComplianceCheck,
        as: 'complianceCheck',
        include: [
          {
            model: ComplianceCheckParameter,
            as: 'parameters',
          },
        ],
      },
    ],
  });

  // console.log('Checking compliance rule:', userComplianceChecks);
  for (const ucc of userComplianceChecks) {
   const parameters = ucc.parameters;
   console.log('Checking compliance rule:', ucc.complianceCheck.function_code, 'with parameters:', parameters);

    switch (ucc.complianceCheck.function_code) {
      // case 'DAILY_HOUR':
      //   await checkDailyHour(mensualTimetable, [parameters]);
      //   break;
      // case 'HEBDO_HOUR':
      //   await checkWeeklyHour(mensualTimetable, [parameters]);
      //   break;
      case 'MONTHLY_HOUR':
        await checkMonthlyHour(mensualTimetable, [parameters]);
        break;
      // case 'DAILY_BREAK':
      //   await checkDailyBreak(mensualTimetable, [parameters]);
      //   break;
      // case 'REST_PERIOD':
      //   await checkRestPeriod(mensualTimetable, [parameters]);
      //   break;
      // case 'WORK_BLOCK':
      //   await checkWorkBlock(mensualTimetable, [parameters]);
      //   break;
      // case 'DAYS_OFF':
      //   await checkDaysOff(mensualTimetable, [parameters]);
      //   break;
      default:
        console.error(`Unknown compliance check function code: ${ucc.complianceCheck.function_code}`);
    }
  }
};

const checkDailyHour = async (mensualTimetable, parameters) => {
 console.log('Checking daily params:', { parameters });

 const maxDailyHours = parameters[0].value;

 console.log('Checking daily hours:', { maxDailyHours });

 const dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée'); 

 const dailyHours = dailyTimetablesTravaille.map((daily) => {
   return {"date": daily.day, "hours": daily.timeSlots.reduce((total, slot) => {
     if(slot.status != 'Travaillé') return total;
     const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
     return total + duration;
   }, 0)};
 });

 console.log('Daily hours:', dailyHours);

 const violations = dailyHours.filter(hours => hours.hours > maxDailyHours);

 if (violations.length > 0) {
   console.log('Daily hour limit violated:', violations);
 }
 return violations;
};


const getStartOfWeek = (date) => {
 const currentDate = new Date(date);
 const day = currentDate.getDay(); // 0 (dimanche) à 6 (samedi)
 const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Ajuster pour que lundi soit le début de la semaine
 const startOfWeek = new Date(currentDate.setDate(diff));
 startOfWeek.setHours(0, 0, 0, 0); // S'assurer que l'heure est à minuit
 return startOfWeek.toISOString(); 
};

const checkWeeklyHour = async (mensualTimetable, parameters) => {
 const maxWeeklyHours = parameters[0].value;
 const weeklyHours = {}; // Object to store weekly hour totals

 const firstDayOfMonth = new Date(`${mensualTimetable.year}-${mensualTimetable.month}-01`);
  const startOfFirstWeek = new Date(getStartOfWeek(firstDayOfMonth)); // Get the start of the first week

  // If the start of the first week is in the previous month, fetch additional data
  let previousMonthTimetables = [];
  if (startOfFirstWeek.getMonth() !== firstDayOfMonth.getMonth()) {
    const lastDayOfPreviousMonth = new Date(firstDayOfMonth);
    lastDayOfPreviousMonth.setDate(0); // Last day of December

    previousMonthTimetables = await DailyTimetableSheet.findAll({
      where: {
        day: {
         [Op.between]: [
          startOfFirstWeek, // Start of the week containing 1st January
          new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() - 1, 31), // Last day of December
        ],
        },
      },
      include: [
        {
          model: TimeSlot,
          as: 'timeSlots',
        },
      ],
    });
  }

  // Combine current month and previous month timetables
  const allTimetables = [...previousMonthTimetables, ...mensualTimetable.dailyTimetables];


 const dailyTimetablesTravaille = allTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée'); 

 // Iterate over all days in the timetables
 dailyTimetablesTravaille.forEach((daily) => {
   const currentDate = new Date(daily.day);


   // Convert the start of the week to a string for use as a key
   const weekKey = getStartOfWeek(currentDate);

   // Calculate the total hours for the day
   const dailyTotal = daily.timeSlots.reduce((total, slot) => {
    if(slot.status != 'Travaillé') return total;
     const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
     return total + duration;
   }, 0);

   // Accumulate hours for the week
   weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + dailyTotal;
 });

 console.log('Weekly hours:', weeklyHours);

 const violations = Object.entries(weeklyHours).filter(([week, hours]) => hours > maxWeeklyHours);
 console.log('Weekly hour violations:', violations);
 return violations;
};


const checkMonthlyHour = async (mensualTimetable, parameters) => {
  const maxMonthlyHours = parameters[0].value;
  const dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée');
  const totalHours = dailyTimetablesTravaille.reduce((total, daily) => {
    return total + daily.timeSlots.reduce((subTotal, slot) => {
      if (slot.status != 'Travaillé') return subTotal;
      const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
      return subTotal + duration;
    }, 0);
  }, 0);
  console.log('Total hours:', totalHours, 'Max monthly hours:', maxMonthlyHours);
  if (totalHours > maxMonthlyHours) {
    console.log('Monthly hour limit exceeded:', totalHours);
  }
};

//todo
const checkDailyBreak = async (mensualTimetable, parameters) => {
  const minDailyBreak = parameters.find(param => param.id_parameter === 4)?.value || 60;
  const minLongestBreak = parameters.find(param => param.id_parameter === 5)?.value || 30;

  mensualTimetable.dailyTimetables.forEach((daily) => {
    const breaks = daily.timeSlots.slice(1).map((slot, i) => {
      const previousSlot = daily.timeSlots[i];
      return (new Date(`1970-01-01T${slot.start}`) - new Date(`1970-01-01T${previousSlot.end}`)) / 60000; // in minutes
    });

    const totalBreaks = breaks.reduce((total, b) => total + b, 0);
    const longestBreak = Math.max(...breaks);

    if (totalBreaks < minDailyBreak || longestBreak < minLongestBreak) {
      console.log('Break rules violated:', { totalBreaks, longestBreak });
    }
  });
};

const checkRestPeriod = async (mensualTimetable, parameters) => {
  const minRestPeriod = parameters.find(param => param.id_parameter === 6)?.value || 11;

  mensualTimetable.dailyTimetables.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (let i = 1; i < mensualTimetable.dailyTimetables.length; i++) {
    const previousDay = mensualTimetable.dailyTimetables[i - 1].timeSlots;
    const currentDay = mensualTimetable.dailyTimetables[i].timeSlots;

    const previousDayEnd = new Date(`1970-01-01T${previousDay[previousDay.length - 1].end}`);
    const currentDayStart = new Date(`1970-01-01T${currentDay[0].start}`);

    const restPeriod = (currentDayStart - previousDayEnd) / 3600000; // in hours

    if (restPeriod < minRestPeriod) {
      console.log('Rest period rule violated:', { restPeriod });
    }
  }
};

const checkWorkBlock = async (mensualTimetable, parameters) => {
  const maxWorkBlockDuration = parameters.find(param => param.id_parameter === 7)?.value || 4;

  mensualTimetable.dailyTimetables.forEach((daily) => {
    daily.timeSlots.forEach((slot) => {
      const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;

      if (duration > maxWorkBlockDuration) {
        console.log('Work block duration rule violated:', { duration });
      }
    });
  });
};

const checkDaysOff = async (mensualTimetable, parameters) => {
  const minDaysOff = parameters.find(param => param.id_parameter === 8)?.value || 2;
  const workDays = mensualTimetable.dailyTimetables.map(daily => new Date(daily.date).getDay());
  const uniqueDays = new Set(workDays);

  const totalDaysOff = 7 - uniqueDays.size;

  if (totalDaysOff < minDaysOff) {
    console.log('Days off rule violated:', { totalDaysOff });
  }
};


 // checkEachRule(1, 1);


 module.exports = complianceCheckController;

