const axios = require("axios");
const cheerio = require("cheerio");
const { BASE_URL } = require("../utils/constant");

const getKomik = (endpoint) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(BASE_URL + "daftar-komik/" + endpoint);
    const $ = cheerio.load(response.data);

    const komik = $(".list-update")
      .find(".list-update_items-wrapper")
      .find(".list-update_item");
    const result = [];
    komik.each(function () {
      const slug = $(this).find("a").attr("href");
      if (slug === undefined) {
        console.log("slug undefined");
        console.log($(this).find("h3.title").text());
      }
      result.push({
        title: $(this).find("h3.title").text(),
        thumb: $(this).find("img").attr("src"),
        slug:
          $(this).find(".data-tooltip").attr("href").split("/")[4] ??
          "tidak ada",
        chapter: $(this).find(".chapter").text().replace("Ch.", "").trim(),
        rating: $(this).find(".numscore").text(),

        type: $(this).find(".type").text(),
        slugChapter:
          $(this).find(".chapter").attr("href").split("/")[4] ?? "tidak ada",
      });
    });

    resolve({
      data: result,
      total: $(".pagination").find("a").eq(-2).text(),
    });
  });
};

const getDetailKomik = (slug) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(BASE_URL + "komik/" + slug);
    const $ = cheerio.load(response.data);

    const title = $(".komik_info-body")
      .find(".komik_info-content-body-title")
      .text();
    const thumb = $(".komik_info-body")
      .find(".komik_info-content-thumbnail-image")
      .attr("src");
    const genre = $(".komik_info-content-body")
      .find(".komik_info-content-genre")
      .find(".genre-item")
      .map(function () {
        return {
          title: $(this).text(),
          slug: $(this).attr("href").split("/")[4],
        };
      })
      .get();
    const released = $(".komik_info-content-body")
      .find(".komik_info-content-info-release")
      .text()
      .trim()
      .split(":")
      .pop()
      .trim();

    const author =
      $('span.komik_info-content-info:contains("Author:")')
        .text()
        .trim()
        .split(":")
        .pop()
        .trim() ?? "-";

    const type = $(".komik_info-content-info-type")
      .text()
      .trim()
      .split(":")
      .pop()
      .trim();

    const updatedAt = $(".komik_info-content-update")
      .find("time")
      .text()
      .trim();

    const synopsis = $(".komik_info-description-sinopsis")
      .find("p")
      .text()
      .trim();
    const rating = $(".data-rating")
      .find("strong")
      .text()
      .replace("Rating", "")
      .trim();

    const chapter = $(".komik_info-chapters")
      .find(".komik_info-chapters-wrapper")
      .find("li")
      .map(function () {
        return {
          title:
            "Chapter " +
            $(this)
              .find("a")
              .text()
              .replace(/\n/g, "")
              .replace("Chapter", "")
              .trim(),
          updatedAt: $(this).find(".chapter-link-time").text().trim(),
          slug:
            $(this).find(".chapter-link-item").attr("href")?.split("/")[4] ??
            "tidak ada",
        };
      })
      .get();

    resolve({
      title: title,
      thumb: thumb,
      genre: genre,
      released: released,
      author: author,
      rating: rating,
      type: type,
      updatedAt: updatedAt,
      synopsis: synopsis,
      chapter: chapter,
    });
  });
};

module.exports = {
  getKomik,
  getDetailKomik,
};
