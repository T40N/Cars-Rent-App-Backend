const mongoose = require("mongoose");

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const usersSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number is required for your password",
      ],
    },
    accessLevel: {
      type: Number,
      default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER),
    },
    ordered_cars: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", usersSchema);
