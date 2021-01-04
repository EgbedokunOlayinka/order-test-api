const jwt = require("jsonwebtoken");

module.exports = async function (req, res, proceed) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const secret = sails.config.jwtSecretKey || process.env.JWT_SECRET;

      const decoded = jwt.verify(token, secret);

      return proceed();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        error: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      error: "Not authorized, token failed",
    });
  }
};
