const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");


const createTokens = (user) => {
  const accessToken = sign({ userId: user.id_user }, process.env.JWT_SECRET || 'mysteriousKey', { expiresIn: "24h" });
  return accessToken;
};

const validateToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ error: "Access token missing" });
    }

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    req.auth = {
      userId: userId,
    };
    console.log("auth.js: User with ID " + req.auth.userId + " sent a request");

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

  

module.exports = { createTokens, validateToken };
