const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.secretKey;
function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(403).send("Access denied, token required");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
   
      req.user = decoded; 

    
    next(); // Continue to the next route handler
  } catch (err) {
    return res.status(400).send("Invalid or expired token");
  }
}
module.exports = verifyToken;
