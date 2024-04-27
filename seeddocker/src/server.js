const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3009;

app.use(express.json());
let formData = {
  name: "John Doe",
  email: "johndoe@example.com",
  interest: "React Development",
};
const url = "mongodb://admin:pass@localhost:27017";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    return;
  }
  console.log("Connected to MongoDB successfully");

  const db = client.db("user-account");
  const collection = db.collection("users");

  app.get("/api/user", (req, res) => {
    const query = { userid: 1 }; // Example query criteria

    // Retrieve user details from MongoDB collection
    collection.findOne(query, (err, user) => {
      if (err) {
        console.error("Error retrieving user details:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    });
  });

  // Define route to handle POST requests to update user data
  app.post("/api/user", (req, res) => {
    const formData = req.body; // Assuming formData is sent in the request body
    const query = { userid: 1 }; // Example query criteria
    const update = { $set: formData }; // Update document with new form data

    // Update user data in MongoDB collection
    collection.updateOne(query, update, (err, result) => {
      if (err) {
        console.error("Error updating user data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      console.log("Data updated successfully");
      res.json({ message: "Data updated successfully" });
    });
  });
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
