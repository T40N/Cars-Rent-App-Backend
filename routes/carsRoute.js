const express = require(`express`);
const app = express();

const carsModel = require("../models/carsModel");

// get all cars
app.get("/cars", (req, res) => {
  carsModel.find((error, data) => {
    res.json(data);
  });
});

// get one car by id
app.get("/cars/:id", (req, res) => {
  carsModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
});

// add new car
app.post(`/cars`, (req, res) => {
  carsModel.create(req.body, (error, data) => {
    res.json(data);
  });
});

// update one car
app.put(`/cars/:id`, (req, res) => {
  carsModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (error, data) => {
      res.json(data);
    }
  );
});


// delete one car
app.delete(`/cars/:id`, (req, res) => {
  carsModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
});

module.exports = app;
