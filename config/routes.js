/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "POST /user/register": "user/register",
  "POST /user/login": "user/login",
  "POST /order": "order/create-order",
  "GET /order": "order/get-orders",
  "GET /order/:id": "order/get-order",
  "PUT /order/:id": "order/update-order",
};
