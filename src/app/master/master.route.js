const express = require("express");
const { masterDataKomik } = require("./master.controller");
const router = express.Router();

router.get("/master/filter", masterDataKomik);

module.exports = router;
