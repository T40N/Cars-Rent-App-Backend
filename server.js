require(`dotenv`).config({ path: `./config/.env` });
require(`./config/db`);

const express = require("express");
const app = express();

app.use(
  require(`express-session`)({
    secret: process.env.SESSION_PRIVATE_KEY,
    resave: false,
    cookie: { secure: false, maxAge: 60000 },
    saveUninitialized: true,
  })
);

app.use(require(`body-parser`).json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

// routes here

// port listen

// error handlers
