const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = 3001;

// MongoDB connection
const db = process.env.DB_CONNECTION;
app.use(cors());
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection failed ", err));

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Models
const User = require("./models/User");

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/api/users", async (req, res) => {
  try {
    const { name, age, gender, email } = req.body;
    const newUser = new User({ name, age, gender, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
