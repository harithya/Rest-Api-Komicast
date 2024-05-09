const expres = require("express");
const router = expres.Router();

const { beranda, daftarKomik, detailKomik } = require("./komikcontroller");

router.get("/komik/beranda", beranda);
router.get("/komik/daftar-komik/:page", daftarKomik);
router.get("/komik/detail/:slug", detailKomik);

module.exports = router;
