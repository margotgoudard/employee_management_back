const bcrypt = require("bcrypt");
const { createTokens } = require("../middleware/auth.js");
const User = require("../models/User.js");


const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ where: { mail } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = createTokens(user);

    res.status(200).json({
      message: "Login successful.",
      token: token,
      user: {
        id_user: user.id_user,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        mail: user.mail,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred during login." });
  }
};

module.exports = { login };
