module.exports = {
  friendlyName: "Register",

  description: "Register user.",

  inputs: {
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "User created successfully",
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: "Email address already in use",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const newEmailAddress = inputs.email.toLowerCase();

      const newUser = await User.create({
        email: newEmailAddress,
        password: inputs.password,
      }).fetch();

      const token = await sails.helpers.generateNewJwtToken(newUser.email);

      return exits.success({
        message: `Account created successfully for ${newUser.email}`,
        data: newUser,
        token,
      });
    } catch (error) {
      sails.log.error(error);
      if (error.code === "E_UNIQUE") {
        return exits.emailAlreadyInUse({
          message: "An error occurred",
          error: "This email address already exists",
        });
      }

      return exits.error({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
};
