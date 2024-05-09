const { getKomik, getDetailKomik } = require("../../services/komik");

const beranda = async (req, res) => {
  const hotKomik = await getKomik("?status=&type=&orderby=update");
  const popular = await getKomik("?status=&type=&orderby=popular");
  return res.json({
    hotKomik: hotKomik.data,
    popular: popular.data,
  });
};

const daftarKomik = async (req, res) => {
  const { page } = req.params;
  const response = await getKomik("page/2/");
  return res.json({
    currentPage: page,
    totalPage: response.total,
    response: response.data,
  });
};

const detailKomik = async (req, res) => {
  const { slug } = req.params;
  const response = await getDetailKomik(slug);
  return res.json(response);
};

module.exports = {
  beranda,
  daftarKomik,
  detailKomik,
};
