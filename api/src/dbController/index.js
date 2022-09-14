const axios = require("axios");
const { Activity, Country } = require("../db");

const getCountries = async () => {
  try {
    const info = await axios.get("https://restcountries.com/v3/all");
    const infoApi = info.data;
    await infoApi.map((e) => {
      return Country.findOrCreate({
        where: {
          name: e.name.official,
          id: e.cca3,
        },
        capital: e.capital ? e.capital[0] : "no papa",
        flag: e.flags[0],
        continente: e.continents[0],
      });
    });
  } catch (error) {
    res.status(404).send(error);
  }

  //   try {
  //     let apiCall = await axios.get("https://restcountries.com/v3/all");
  //     apiCall = await apiCall.data.map((country) => {
  //       return Country.findOrCreate({
  //         where: {
  //           id: country.cca3,
  //           name: country.name.common,
  //         },
  //         defaults: {
  //           flag: country.flags[0],
  //           continent: country.continents[0],
  //           capital: country.capital ? country.capital[0] : "Not found",
  //           subregion: country.subregion ? country.subregion : "Not found",
  //           area: country.area,
  //           population: country.population,
  //         },
  //       });
  //     });
  //   } catch (error) {
  //     return console.log(error);
  //   }
};

module.exports = {
  getCountries,
};
