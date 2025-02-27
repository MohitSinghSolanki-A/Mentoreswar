const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("🔑 JWT_SECRET in Backend:", process.env.JWT_SECRET); // Debugging line

    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = auth;
