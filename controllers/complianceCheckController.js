const ComplianceCheck = require('../models/ComplianceCheck');
const ComplianceCheckParameter = require('../models/ComplianceCheckParameter');
const UserComplianceCheck = require('../models/UserComplianceCheck');
const mensualTimetableController = require('./mensualTimetableController');
const MensualTimetableSheet = require('../models/MensualTimetableSheet');
const DailyTimetableSheet = require('../models/DailyTimetableSheet');
const TimeSlot = require('../models/TimeSlot');
const { Op } = require('sequelize'); 
const e = require('cors');

const complianceCheckController = {
  getWeeklyHours : async (req, res) => {
    try {
      const { id } = req.params;
      const mensualTimetable = await MensualTimetableSheet.findOne({
        where: { id_timetable : id },
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
        return res.status(404).json({ message: 'Mensual timetable not found.' });
      }else{
        const weeklyHours = await calculateWeeklyHours(mensualTimetable);
        const updatedWeeklyHours = {};

        Object.keys(weeklyHours).forEach((key) => {
          const mondayDate = new Date(key);
          const sundayDate = new Date(mondayDate);
          sundayDate.setDate(mondayDate.getDate() + 6);
          updatedWeeklyHours[sundayDate] = weeklyHours[key];
        });
        console.log('***************************************************************Weekly hours:', weeklyHours, updatedWeeklyHours);
        return res.status(200).json(updatedWeeklyHours);
      }
    } catch (error) {
      console.error('Error fetching weekly hours:', error);
      return res.status(500).json({ message: 'Error fetching weekly hours', error });
    }
  },

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

  complianceCheckForTimeTable: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Checking compliance for timetable:', id);
      const violations = await checkEachRule(id);
      return res.status(200).json(violations);
    } catch (error) {
      console.error('Error during compliance check:', error);
      return res.status(500).json({ message: 'Error during compliance check', error });
    }
  }
 };


 const checkEachRule = async (id_timetable) => {
  const mensualTimetable = await MensualTimetableSheet.findOne({
    where: { id_timetable },
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
  const id_user = mensualTimetable.id_user;
  console.log('**Checking compliance rules for user:', id_user, 'timetable:', id_timetable);
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

  var violations = {};

  const updateViolations = (newViolations) => {
    Object.entries(newViolations).forEach(([date, message]) => {
      const formattedDate = new Date(date).toISOString();
  
      if (!violations[formattedDate]) {
        violations[formattedDate] = [];
      }

      if (!violations[formattedDate].includes(message)) {
        violations[formattedDate].push(message);
      }
    });
  };
  

  for (const ucc of userComplianceChecks) {
   const parameters = ucc.parameters;
   const complianceCheck = ucc.complianceCheck;
   console.log('Checking compliance rule:', ucc.complianceCheck.function_code, 'with parameters:', parameters);
   switch (complianceCheck.function_code) {
    case 'DAILY_HOUR':
      updateViolations(await checkDailyHour(mensualTimetable, [parameters], complianceCheck));
      break;
    case 'HEBDO_HOUR':
      updateViolations(await checkWeeklyHour(mensualTimetable, [parameters], complianceCheck));
      break;
    case 'MONTHLY_HOUR':
      updateViolations(await checkMonthlyHour(mensualTimetable, [parameters], complianceCheck));
      break;
    case 'DAILY_BREAK':
      updateViolations(await checkDailyBreak(mensualTimetable, [parameters], complianceCheck));
      break;
    case 'REST_PERIOD':
      updateViolations(await checkRestPeriod(mensualTimetable, [parameters], complianceCheck));
      break;
    case 'WORK_BLOCK':
      updateViolations(await checkWorkBlock(mensualTimetable, [parameters], complianceCheck));
      break;
    case 'DAYS_OFF':
      updateViolations(await checkDaysOff(mensualTimetable, [parameters], complianceCheck));
      break;
    default:
      console.error(`Unknown compliance check function code: ${complianceCheck.function_code}`);
  }
  }
  return violations;
};

const checkDailyHour = async (mensualTimetable, parameters, complianceCheck) => {
 console.log('Checking daily params:', { parameters });

 const maxDailyHours = parameters[0].value;

 const dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée'); 

 const dailyHours = dailyTimetablesTravaille.map((daily) => {
   return {
    "date": daily.day, 
    "hours": daily.timeSlots.reduce((total, slot) => {
     if(slot.status != 'Travaillé') return total;
     const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
     return total + duration;
    }, 0)
  }
 });

 const violations = dailyHours
  .filter((hours) => hours.hours > maxDailyHours)
  .reduce((acc, violation) => {
    acc[violation.date] = `Le nombre d'heures travaillées (${violation.hours}h) dépasse la limite maximale autorisée (${maxDailyHours}h).`;
    return acc;
  }, {});

  console.log('Daily hour limit violated:', violations);
 return violations;
};


const getStartOfWeek = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); 
  const startOfWeek = new Date(currentDate.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0); 
  return startOfWeek; 
};

const getEndOfWeek = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() + (day === 0 ? 0 : 7 - day); 
  const endOfWeek = new Date(currentDate.setDate(diff));
  endOfWeek.setHours(23, 59, 59, 999); 
  return endOfWeek;
};  

const calculateWeeklyHours = async (mensualTimetable) => {
  const weeklyHours = {}; 

  const firstDayOfMonth = new Date(`${mensualTimetable.year}-${mensualTimetable.month}-01`);
  const startOfFirstWeek = new Date(getStartOfWeek(firstDayOfMonth)); 

  const lastDayOfMonth = new Date(mensualTimetable.year, mensualTimetable.month, 0);
  const endOfLastWeek = new Date(getEndOfWeek(lastDayOfMonth)); 

  let allTimetables = {};
  allTimetables =  await DailyTimetableSheet.findAll({
    where: {
      day: {
        [Op.between]: [
          startOfFirstWeek,
          endOfLastWeek,
        ],
      }
    },
    include: [
      {
        model: MensualTimetableSheet,
        as: 'mensualTimetable', 
        where: {
          id_user: mensualTimetable.id_user, 
        },
      },
      {
        model: TimeSlot,
        as: 'timeSlots',
      },
    ],
  });
 
  const dailyTimetablesTravaille = allTimetables.filter(
    (daily) => daily.status === 'Travaillé' || daily.status === 'Demi-journée'
  );

  dailyTimetablesTravaille.forEach((daily) => {
    const currentDate = new Date(daily.day);
    const weekKey = getStartOfWeek(currentDate);

    const dailyTotal = daily.timeSlots.reduce((total, slot) => {
      if (slot.status !== 'Travaillé') return total;
      const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
      return total + duration;
    }, 0);

    weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + dailyTotal;
  });

  return weeklyHours;
};


const checkWeeklyHour = async (mensualTimetable, parameters, complianceCheck) => {
  const maxWeeklyHours = parameters[0].value;
  const weeklyHours = await calculateWeeklyHours(mensualTimetable); 
  console.log('Weekly hours:', weeklyHours);

  const violations = Object.entries(weeklyHours).reduce((acc, [week, hours]) => {
    if (hours > maxWeeklyHours) {
      acc[week] = `Le total d'heures travaillées pour la semaine débutant le ${week.split('T')[0]} est de ${hours} heures, ce qui dépasse la limite maximale autorisée (${maxWeeklyHours} heures).`;
    }
    return acc;
  }, {});

  console.log('Weekly hour violations:', violations);
  return violations;
};

const checkMonthlyHour = async (mensualTimetable, parameters, complianceCheck) => {
  const maxMonthlyHours = parameters[0].value;
  const dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée');
  const totalHours = dailyTimetablesTravaille.reduce((total, daily) => {
    return total + daily.timeSlots.reduce((subTotal, slot) => {
      if (slot.status != 'Travaillé') return subTotal;
      const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
      return subTotal + duration;
    }, 0);
  }, 0);
  var violations = {};
  if (totalHours > maxMonthlyHours) {
    const firstDayOfMonth = new Date(`${mensualTimetable.year}-${mensualTimetable.month}-01`);
    violations[firstDayOfMonth] = `Le total d'heures travaillées mensuelles est de ${totalHours} heures, ce qui dépasse la limite maximale autorisée (${maxMonthlyHours} heures).`;
  }

  console.log('Monthly hour rule violated:', { violations });
  return violations;
};

const checkDailyBreak = async (mensualTimetable, parameters, complianceCheck) => {
  const break_5h = parameters.filter((param) => param.id_parameter == 4).value || 15;
  const break_7h = parameters.filter((param) => param.id_parameter == 5).value || 30;
  const break_9h = parameters.filter((param) => param.id_parameter == 6).value || 60;
  const break_min = parameters.filter((param) => param.id_parameter == 7).value || 30;
  const isBreakFractionnable = parameters.filter((param) => param.id_parameter == 8).value || true;

  var violations = {};
  var dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée');
  dailyTimetablesTravaille.map((daily) => { 
    if(daily.timeSlots.length > 1 && !isBreakFractionnable) {
      violations[daily.day] = 'Break is not fractionnable';
    }else{
      const work_duration = daily.timeSlots.reduce((total, slot) => {
        if(slot.status != 'Travaillé') return total;
        const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
        return total + duration;
      }, 0);
  
      var break_duration = 0; 
      var nb_break_min = 0;
      for (let i = 1; i < daily.timeSlots.length ; i++){
        const start = new Date(`1970-01-01T${daily.timeSlots[i].start}`);
        var end = new Date(`1970-01-01T${daily.timeSlots[i-1].end}`);
        if(daily.timeSlots[i-1].status != 'Travaillé') {
          end = new Date(`1970-01-01T${daily.timeSlots[i-1].start}`);
        }

        break_duration += (start - end) / 60000 ;
        if((start - end) / 60000 >= break_min) nb_break_min++
      }

      if (work_duration > 5.5 && work_duration <= 7 && break_duration < break_5h) {
        violations[daily.day] = `La durée de pause (${break_duration} minutes) est inférieure à ${break_5h} minutes pour une durée de travail supérieure à 5.5 heures (${work_duration}h).`;
      } else if (work_duration > 9) {
        if (break_duration < break_9h) {
          violations[daily.day] = `La durée de pause (${break_duration} minutes) est inférieure à ${break_9h} minutes pour une durée de travail supérieure à 9 heures (${work_duration}h).`;
        }
        if (nb_break_min < 1) {
          violations[daily.day] = (violations[daily.day] || "") + ` La durée minimale de la plus grande pause est inférieure à ${break_min} minutes.`;
         }
      } else if (work_duration <= 9 && break_duration < break_7h) {
        violations[daily.day] = `La durée de pause (${break_duration} minutes) est inférieure à ${break_7h} minutes pour une durée de travail supérieure à 7 heures (${work_duration}h).`;
      }
      
    }
  })

  console.log('Daily break rule violated:', { violations });
  return violations;
};

const checkRestPeriod = async (mensualTimetable, parameters, complianceCheck) => {
  const minRestPeriod = parameters[0].value;

  var dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter((daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée');
  dailyTimetablesTravaille = dailyTimetablesTravaille.sort ((a, b) => {
    return a.day - b.day
  });

  var violations = {};

  if (new Date(dailyTimetablesTravaille[0].day).getDate() == 1) {
    const firstDayOfMonth = new Date(`${mensualTimetable.year}-${mensualTimetable.month}-01`);
    var previousMonthTimeSlot = await DailyTimetableSheet.findOne({
      where: {
        day:new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), 0), 
      },
      include: [
        {
          model: TimeSlot,
          as: 'timeSlots',
        },
      ],
    });

    if(previousMonthTimeSlot && (previousMonthTimeSlot.status == 'Travaillé' || previousMonthTimeSlot.status == 'Demi-journée')) {
      previousMonthTimeSlot = previousMonthTimeSlot.timeSlots.sort((a, b) => {
        return a.start - b.start;
      });
  
      const previousDayEnd = new Date(`1970-01-01T${previousMonthTimeSlot[1].end}`);
      const currentDayStart = new Date(`1970-01-01T${dailyTimetablesTravaille[0].timeSlots[0].start}`);
      const restPeriod = 24 + (currentDayStart - previousDayEnd) / 3600000; // in hours
  
      if (restPeriod < minRestPeriod) {
        violations[dailyTimetablesTravaille[0].day] = "Le temps de repos entre deux jours de travail est inférieur à " + minRestPeriod+ " heures. (" + restPeriod + " heures)";
      }
    }
  }

  for (let i = 1; i < dailyTimetablesTravaille.length; i++) {
    const previousDay = dailyTimetablesTravaille[i - 1].timeSlots.sort((a, b) => {
      return a.start - b.start;
    });
    const currentDay = dailyTimetablesTravaille[i].timeSlots.sort((a, b) => {
      return a.start - b.start;
    });

    const previousDayEnd = new Date(`1970-01-01T${previousDay[previousDay.length - 1].end}`);
    const currentDayStart = new Date(`1970-01-01T${currentDay[0].start}`);

    const restPeriod = 24 + (currentDayStart - previousDayEnd) / 3600000; // in hours

    if (restPeriod < minRestPeriod) {
      violations[dailyTimetablesTravaille[i].day] = "Le temps de repos entre deux jours de travail est inférieur à 11 heures.";
    }
  }
  console.log('Rest period rule violated:', { violations });
  return violations;
};

const checkWorkBlock = async (mensualTimetable, parameters, complianceCheck) => {
  console.log('Checking work block parameters:', { parameters });

  const maxWorkBlockDuration = parameters[0].value;
  const dailyTimetablesTravaille = mensualTimetable.dailyTimetables.filter(
    (daily) => daily.status == 'Travaillé' || daily.status == 'Demi-journée'
  );

  // Pour chaque jour, collecter les durées des timeSlots qui dépassent la limite
  var violations = {};
  dailyTimetablesTravaille.map((daily) => {
    daily.timeSlots
      .filter((slot) => {
        const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
        return duration > maxWorkBlockDuration;
      })
      .map((slot) => {
        const duration = (new Date(`1970-01-01T${slot.end}`) - new Date(`1970-01-01T${slot.start}`)) / 3600000;
        violations[daily.day] = `La durée du bloc de travail (${duration} heures) dépasse la limite maximale autorisée (${maxWorkBlockDuration} heures).`;
      });
  });

  console.log('Work block duration rule violated:', violations);

  return violations;
};


const checkDaysOff = async (mensualTimetable, parameters, complianceCheck) => {
  const minDaysOff = parameters[0].value;
  const firstDayOfMonth = new Date(`${mensualTimetable.year}-${mensualTimetable.month}-01`);
  const startOfFirstWeek = new Date(getStartOfWeek(firstDayOfMonth));
  let previousMonthTimetables = {};

  if(startOfFirstWeek.getMonth() !== firstDayOfMonth.getMonth()) {
    const lastDayOfPreviousMonth = new Date(firstDayOfMonth);
    lastDayOfPreviousMonth.setDate(0); 

    previousMonthTimetables = await DailyTimetableSheet.findAll({
      where: {
        day: {
         [Op.between]: [
          startOfFirstWeek,
          new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), 0), 
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
  var allTimetables = [...previousMonthTimetables, ...mensualTimetable.dailyTimetables];
  var weeklyHours = {};
  allTimetables.forEach((daily) => {
    const currentDate = new Date(daily.day);
    const weekKey = getStartOfWeek(currentDate);
    var nbWorkDays = 0;
    if(daily.status == 'Travaillé') nbWorkDays = 1;
    if(daily.status == 'Demi-journée') nbWorkDays = 0.5; 
    weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + nbWorkDays;
  });

  const violations = Object.entries(weeklyHours).reduce((acc, [week, days]) => {
    const daysOff = 7 - days;
    if (daysOff < minDaysOff) {
      acc[week] = `La semaine débutant le ${week} n'a que ${daysOff} jours de repos, ce qui est inférieur au minimum requis de ${minDaysOff} jours.`;
    }
    return acc;
  }, {});
  console.log('Days off rule violated:', violations);
  return violations;
};


// checkEachRule(1);


 module.exports = complianceCheckController;

