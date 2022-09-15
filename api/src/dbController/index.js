const axios = require("axios");
const { Activity, Country } = require("../db");

const getCountries = async () => {
  // const countries = Country.findAll();

  // if (!countries.length) {
  //   const info = await axios.get("https://restcountries.com/v3/all");
  //   const infoApi = info.data.map((e) => {
  //     return {
  //       name: e.name.official,
  //       id: e.cca3,
  //       capital: e.capital ? e.capital[0] : "no papa",
  //       flag: e.flags[0],
  //       continente: e.continents[0],
  //     };
  //   });
  //   await Country.bulkCreate(infoApi);
  //   console.log("creada");
  // }

  const countries = Country.findAll();
  console.log(countries);

  if (!countries.length) {
    const info = await axios.get("https://restcountries.com/v3/all");
    const infoApi = await info.data.map((e) => {
      return {
        name: e.name.official,
        id: e.cca3,
        capital: e.capital ? e.capital[0] : "no papa",
        flag: e.flags[0],
        continente: e.continents[0],
      };
    });

    // await Country.bulkCreate(infoApi);

    console.log("creada");
  }
};

module.exports = {
  getCountries,
};
