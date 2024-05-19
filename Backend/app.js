require("dotenv").config();

// variables
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const { db } = require("./db/db");
const { readdirSync } = require("fs");

// middlewares
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// functions
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
};

// function call
server();
