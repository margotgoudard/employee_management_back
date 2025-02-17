const bcrypt = require("bcrypt");
const { createTokens } = require("../middleware/auth.js");
const User = require("../models/User.js");
const { createAudit } = require('./auditController.js');
const Permission = require("../models/Permission.js");

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({
      where: { mail },
      include: [
        {
          model: Permission, 
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.is_activated) {
      return res.status(403).json({ error: "Your account has been deactivated. Please contact support." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = createTokens(user);

    await createAudit({
      table_name: 'user',
      action: 'LOGIN',
      old_values: null,
      new_values: { mail: user.mail },
      userId: user.id_user, 
    });

    const permissions = user.Permissions.map(permission => permission.name); 

    return res.status(200).json({
      message: "Login successful.",
      token: token,
      user: user,
      permissions: permissions
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred during login."+err });
  }
};

module.exports = { login };
