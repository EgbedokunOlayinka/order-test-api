const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Get user",

  description: "",

  inputs: {
    token: {
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
    const secret = sails.config.jwtSecretKey || process.env.JWT_SECRET;

    const decoded = jwt.verify(inputs.token, secret);

    const user = await User.find({ email: decoded.sub });

    return user[0];
  },
};
