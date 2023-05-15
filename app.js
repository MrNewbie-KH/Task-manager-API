// require("./db/db");
const connectToDB = require("./db/db");
const express = require("express");
const app = express();
const router = require("./routes/route");
const port = 3000;
require("dotenv").config();

// middleware
app.use(express.static("./public"));
app.use(express.json());
// routes to be used
app.use("/api/v1/tasks", router);

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
