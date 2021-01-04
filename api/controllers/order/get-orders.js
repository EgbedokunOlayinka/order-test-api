module.exports = {
  friendlyName: "Get orders",

  description: "Get all orders",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Order retrieved successfully",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (_, exits) {
    try {
      const orders = await Order.find().populate("creator");

      return exits.success({
        message: `Orders retrieved successfully`,
        data: orders,
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
