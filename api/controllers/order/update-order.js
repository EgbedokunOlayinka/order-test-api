module.exports = {
  friendlyName: "Update order",

  description: "Update specific order status by its id",

  inputs: {
    orderStatus: {
      type: "string",
      isIn: ["unconfirmed", "confirmed"],
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Order updated successfully",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const orderId = this.req.params.id;

      var updatedOrder = await Order.updateOne({ id: orderId }).set({
        orderStatus: inputs.orderStatus,
      });

      return exits.success({
        message: `Order updated successfully`,
        data: updatedOrder,
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
