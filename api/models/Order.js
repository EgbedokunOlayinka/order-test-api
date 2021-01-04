/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "orders",
  attributes: {
    orderName: {
      type: "string",
      required: true,
      unique: true,
      columnName: "order_name",
    },
    orderStatus: {
      type: "string",
      isIn: ["unconfirmed", "confirmed"],
      defaultsTo: "unconfirmed",
      columnName: "order_status",
    },
    creator: {
      model: "user",
    },
  },
};
