const { Subordination, User, Department } = require('../models/Relations');
const { createAudit } = require('./auditController'); 

const getManagerForUser = async (userId) => {
    try {
      
      const subordinations = await Subordination.findAll({
        where: { id_user: userId }, 
        include: [
          {
            model: User,
            as: 'manager', 
            attributes: ['id_user'], 
          }
        ]
      });
  
      if (subordinations.length > 0) {
        const managerIds = subordinations.map(subordination => subordination.manager.id_user); 
        return managerIds;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des managers:', error);
      throw new Error('Erreur lors de la récupération des managers');
    }
  };
  

  const getManagerChain = async (userId) => {
    try {
      let managerChain = [];
      let currentUserId = userId;
  
      while (true) {
        const subordinations = await Subordination.findAll({
          where: { id_user: currentUserId },
          include: [
            {
              model: User,
              as: 'manager',
              attributes: ['id_user'], 
            }
          ]
        });
  
        if (subordinations.length > 0) {
          subordinations.forEach(subordination => {
            const managerId = subordination.manager.id_user; 
            if (!managerChain.includes(managerId)) {
              managerChain.push(managerId); 
            }
          });
  
          currentUserId = subordinations[0].manager.id_user; 
        } else {
          break; 
        }
      }
      return managerChain; 
    } catch (error) {
      console.error('Erreur lors de la récupération de la chaîne des managers:', error);
      throw new Error('Erreur lors de la récupération de la chaîne des managers');
    }
  };
  
  const getSubordinatesRecursive = async (managerId) => {
    try {
        // Trouver les subordonnés directs de ce manager
        const directSubordinates = await Subordination.findAll({
            where: { id_manager: managerId },
            include: [
                {
                    model: User,
                    as: 'user', 
                    attributes: { exclude: ['password'] }, 
                    include: [
                        {
                            model: Department, 
                            as: 'department'
                        }
                    ]
                }
            ]
        });
    
        let allSubordinates = [...directSubordinates];
    
        // Pour chaque subordonné direct, trouver ses subordonnés (récursivement)
        for (const subordinate of directSubordinates) {
            const nestedSubordinates = await getSubordinatesRecursive(subordinate.id_user);
            allSubordinates.push(...nestedSubordinates);
        }
    
        return allSubordinates;
    } catch (error) {
        console.error('Error fetching subordinates:', error);
        throw new Error('Error fetching subordinates');
    }
};


const subordinationController = {

  // Créer une subordination
  assignManagerToUser: async (req, res) => {
    try {
      const { id_user, id_manager} = req.body;
      const userId = req.auth.userId; 
      
      const manager = await User.findByPk(id_manager);
      if (!manager) {
        return res.status(404).json({ message: 'Manager non trouvé' });
      }

      const subordinate = await User.findByPk(id_user);
      if (!subordinate) {
        return res.status(404).json({ message: 'Utilisateur subordonné non trouvé' });
      }


      const existingSubordination = await Subordination.findOne({
        where: { id_user, id_manager },
      });

      if (existingSubordination) {
        return res.status(400).json({ message: 'Relation de subordination déjà existante' });
      }

      const subordination = await Subordination.create({
        id_user,
        id_manager,
      });

      await createAudit({
        table_name: 'subordination',
        action: 'CREATE',
        old_values: null,
        new_values: subordination.dataValues,
        userId,
      });

      return res.status(201).json({
        message: 'Manager assigné à l\'utilisateur avec succès',
        subordination,
      });
    } catch (error) {
      console.error('Erreur lors de l\'assignation du manager:', error);
      return res.status(500).json({ message: 'Erreur lors de l\'assignation', error });
    }
  },

  // Obtenir la liste des subordonnés pour un manager dans un département
  getSubordinatesByManager : async (req, res) => {
    const { id_manager } = req.params;
  
    try {
      const subordinates = await Subordination.findAll({
        where: {
          id_manager: id_manager,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
            include: [
              {
                model: Department, 
                as: 'department',
                attributes: ['id_department', 'name'], 
              }
            ]
          },
          {
            model: User,
            as: 'manager', 
            attributes: ['id_user', 'mail'] 
          },
          
        ]
      });
  
      res.status(200).json(subordinates);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération des subordonnés",
        error: error.message
      });
    }
  },
  

  removeSubordination: async (req, res) => {
    try {
      const { id_user, id_manager } = req.params;
      const userId = req.auth.userId; 

      const subordination = await Subordination.findOne({
        where: { id_user, id_manager },
      });

      if (!subordination) {
        return res.status(404).json({ message: 'Relation de subordination non trouvée' });
      }

      await subordination.destroy();

      await createAudit({
        table_name: 'subordination',
        action: 'DELETE',
        old_values: subordination.dataValues,
        new_values: null,
        userId,
      });

      return res.status(200).json({
        message: 'Subordination supprimée avec succès',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de la subordination:', error);
      return res.status(500).json({ message: 'Erreur lors de la suppression de la subordination', error });
    }
  },

  // Mettre à jour la subordination (changer le manager d'un utilisateur dans un département)
  updateSubordination: async (req, res) => {
    try {
      const { id_user, id_manager } = req.body;
      const userId = req.auth.userId; 

      const subordination = await Subordination.findOne({
        where: { id_user },
      });

      if (!subordination) {
        return res.status(404).json({ message: 'Relation de subordination non trouvée' });
      }

      subordination.id_manager = id_manager;
      await subordination.save();

      await createAudit({
        table_name: 'subordination',
        action: 'UPDATE',
        old_values: subordination.dataValues,
        new_values: subordination.dataValues,
        userId,
      });

      return res.status(200).json({
        message: 'Subordination mise à jour avec succès',
        subordination,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la subordination:', error);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour de la subordination', error });
    }
  },


  
  
  getManagerHierarchy : async (req, res) => {
    const userId = req.params.id;
  
    try {
      const managerChain = await getManagerChain(userId);
      res.status(200).json(managerChain);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la récupération de la hiérarchie des managers",
        error: error.message
      })
    }
  },


  getManager : async (req, res) => {
    const userId = req.params.id;
  
    try {
      const manager = await getManagerForUser(userId);
      if (manager) {
        res.status(200).json(manager);
      } else {
        res.status(404).json({ message: "Manager non trouvé" }); 
      }
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du manager",
        error: error.message
      });
    }
  },
  
  getAllSubordinatesByManager : async (req, res) => {
    const { id_manager } = req.params;
  
    try {
      const subordinates = await getSubordinatesRecursive(id_manager);
  
      const formattedResult = subordinates.map(sub => ({
        user: sub.user, 
      }));
  
      res.status(200).json(formattedResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Erreur lors de la récupération des subordonnés',
        error: error.message,
      });
    }
  },
  
};

module.exports = { subordinationController , getManagerForUser};
