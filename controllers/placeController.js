const Place = require('../models/Place');
const PlaceCategory = require('../models/PlaceCategory');

const placeController = {
    
  // Créer un lieu
  createPlace: async (req, res) => {
    try {
      const {
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        id_place_category,
      } = req.body;

      const place = await Place.create({
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        id_place_category,
      });

      return res.status(201).json({ message: 'Place created successfully', place });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating place', error });
    }
  },

  // Récupérer tous les lieux
  getPlaces: async (req, res) => {
    try {
      const places = await Place.findAll({
        include: [{ model: PlaceCategory, as: 'category', attributes: ['name'] }],
      });

      return res.status(200).json(places);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching places', error });
    }
  },

  // Récupérer un lieu par ID
  getPlaceById: async (req, res) => {
    try {
      const { id } = req.params;

      const place = await Place.findByPk(id, {
        include: [{ model: PlaceCategory, as: 'category', attributes: ['name'] }],
      });

      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }

      return res.status(200).json(place);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching place', error });
    }
  },

  // Mettre à jour un lieu
  updatePlace: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        id_place_category,
      } = req.body;

      const place = await Place.findByPk(id);

      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }

      await place.update({
        num_address,
        street_address,
        city_address,
        area_code_address,
        region_address,
        country_address,
        id_place_category,
      });

      return res.status(200).json({ message: 'Place updated successfully', place });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating place', error });
    }
  },

  // Supprimer un lieu
  deletePlace: async (req, res) => {
    try {
      const { id } = req.params;

      const place = await Place.findByPk(id);

      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }

      await place.destroy();
      return res.status(200).json({ message: 'Place deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting place', error });
    }
  },
};

module.exports = placeController;
