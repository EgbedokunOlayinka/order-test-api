const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Generate new jwt token",

  description: "",

  inputs: {
    userEmail: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const payload = {
      sub: inputs.userEmail,
      iss: "Order Test API",
    };

    const secret = sails.config.jwtSecretKey || process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret, { expiresIn: "24h" });

    return token;
  },
};
