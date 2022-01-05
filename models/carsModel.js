const mongoose = require(`mongoose`);

const carsSchema = new mangoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: { type: String },
    Miles_per_Gallon: { type: Number },
    Cylinders: { type: Number },
    Displacement: { type: Number },
    Horsepower: { type: Number },
    Weight_in_lbs: { type: Number },
    Acceleration: { type: Number },
    Year: { type: Date },
    Origin: { type: String },
  },
  {
    collection: "Cars",
  }
);

module.exports = mongoose.model("Cars", carsSchema);
