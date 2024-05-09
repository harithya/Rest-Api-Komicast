const { getMasterData } = require("../../services/master");

const masterDataKomik = async (req, res) => {
  const genre = await getMasterData(".genrez");
  const status = await getMasterData(".status");
  const type = await getMasterData(".type");
  return res.send({
    genre,
    status,
    type,
  });
};

module.exports = {
  masterDataKomik,
};
