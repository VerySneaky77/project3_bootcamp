require("dotenv").config(); //TK
// Express initialization
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

// Passport configuration TK
// const passport = require("passport");
require("./services/passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

// Serve Static TK
app.use(express.static("app/build"));

// Add routes, both API and view
app.use(routes);

// Index call TK
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/client/public/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/restaurant");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});