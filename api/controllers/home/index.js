module.exports = {
  friendlyName: "Get homepage",

  description: "Get homepage",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Welcome to Order Test API",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (_, exits) {
    try {
      return exits.success({
        message: `Welcome to Order Test API`,
      });
    } catch (error) {
      sails.log.error(error);

      return exits.error({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
};
