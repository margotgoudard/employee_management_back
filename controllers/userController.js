// Exemple de base : logique utilisateur
const getUsers = (req, res) => {
    res.json({ success: true, users: [] });
  };
  
  const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Champs manquants" });
    }
    res.status(201).json({ success: true, message: "Utilisateur créé", user: { name, email } });
  };
  
  module.exports = { getUsers, createUser };
  