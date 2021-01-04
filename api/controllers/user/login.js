module.exports = {
  friendlyName: "Login",

  description: "Login user.",

  inputs: {
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Login successful",
    },
    notAUser: {
      statusCode: 404,
      description: "User not found",
    },
    incorrectPassword: {
      statusCode: 401,
      description: "Password do not match",
    },
    operationalError: {
      statusCode: 400,
      description: "The request was formed properly",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const user = await User.findOne({ email: inputs.email });

      if (!user) {
        return exits.notAUser({
          error: `Account not found`,
        });
      }

      await sails.helpers.passwords
        .checkPassword(inputs.password, user.password)
        .intercept("incorrect", (error) => {
          exits.incorrectPassword({
            error: "Invalid email/password combination",
          });
        });

      const token = await sails.helpers.generateNewJwtToken(user.email);

      return exits.success({
        message: `Login successful`,
        data: user,
        token,
      });
    } catch (error) {
      sails.log.error(error);

      if (error.isOperational) {
        return exits.operationalError({
          message: `Error logging in user`,
          error: error.raw,
        });
      }

      return exits.error({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
};
