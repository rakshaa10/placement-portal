const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/companyRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const roundRoutes = require("./routes/roundRoutes");
const questionRoutes = require("./routes/questionRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});
app.use("/companies", companyRoutes);

app.use("/experiences", experienceRoutes);

app.use("/rounds", roundRoutes);

app.use("/questions", questionRoutes);

app.use("/auth", authRoutes);

module.exports = app;
