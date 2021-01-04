module.exports = {
  friendlyName: "Get order",

  description: "Get a specific order by its id",

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
      const orderId = this.req.params.id;

      const orders = await Order.find({ id: orderId }).populate("creator");

      return exits.success({
        message: `Order retrieved successfully`,
        data: orders[0],
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
