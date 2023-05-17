// require("./db/db");
const connectToDB = require("./db/db");
const express = require("express");
require("dotenv").config();
const app = express();
const router = require("./routes/route");
const port = process.env.PORT || 3000;
const notFound = (req, res) => {
  res.status(404).send("404 Route doesn't exist");
};
// middleware
app.use(express.static("./public"));
app.use(express.json());
// routes to be used
app.use("/api/v1/tasks", router);
app.use(notFound);

const start = async function () {
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("I'm working on port " + port);
    });
    // console.log(ans);
  } catch (error) {
    console.log(error);
  }
};
start();
