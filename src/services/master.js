const axios = require("axios");
const cheerio = require("cheerio");
const { BASE_URL } = require("../utils/constant");

const getMasterData = (selector) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(BASE_URL + "daftar-komik/");
    const $ = cheerio.load(response.data);

    const item = $(selector).find("li");
    const result = [];
    item.each(function () {
      result.push({
        title: $(this).find("label").text().trim(),
        value: $(this).find("input").attr("value").trim(),
      });
    });

    resolve(result);
  });
};

module.exports = {
  getMasterData,
};
