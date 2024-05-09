const express = require("express");
const app = express();
require("dotenv").config();

const {
  env: { PORT, BASE_URL },
} = process;

const homeRoute = require("./src/app/komik/komik.route");
const masterRouter = require("./src/app/master/master.route");
app.use("/api/", homeRoute);
app.use("/api/", masterRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`);
});
