const express = require("express");
const app = express();
const port = 3000;

const homeRoute = require("./src/app/komik/komik.route");
const masterRouter = require("./src/app/master/master.route");
app.use("/api/", homeRoute);
app.use("/api/", masterRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`);
});