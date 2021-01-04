module.exports = {
  friendlyName: "Create order",

  description: "Create an order",

  inputs: {
    orderName: {
      type: "string",
      required: true,
      unique: true,
    },
    orderStatus: {
      type: "string",
      isIn: ["unconfirmed", "confirmed"],
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "Order created successfully",
    },
    orderExists: {
      statusCode: 400,
      description: "Order name already exists",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const token = this.req.headers.authorization.split(" ")[1];

      const user = await sails.helpers.getUser(token);

      const newOrder = await Order.create({
        orderName: inputs.orderName,
        orderStatus: inputs.orderStatus ? inputs.orderStatus : "unconfirmed",
        creator: user.id,
      }).fetch();

      return exits.success({
        message: `Order created successfully by ${user.email}`,
        data: newOrder,
      });
    } catch (error) {
      sails.log.error(error);
      if (error.code === "E_UNIQUE") {
        return exits.orderExists({
          message: "An error occurred",
          error: "This order name already exists",
        });
      }

      return exits.error({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
};
