const { Router } = require("express");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Activity, Country } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const data = async () => {
  const countries = await axios.get("https://restcountries.com/v3/all");
  return countries.data;
};

router.get("/countries", async (req, res) => {
  // const apiCountries = await data();
  // const infoApi = apiCountries.map((e) => {
  //   return {
  //     id: e.cca3,
  //     name: e.name.official,
  //     flag: e.flag,
  //     continente: e.continents,
  //     capital: e.capital,
  //   };
  // });
  // res.json(infoApi);
  // try {
  //   let findPaises = await Country.findAll();
  //   if (!findPaises.length) {
  //     await Country.bulkCreate(infoApi);
  //   }
  // } catch {}
  //   try {
  //     let findPaises = await Country.findAll();
  //     if (!findPaises.length) {
  //       await Country.bulkCreate(infoApi);
  //     } else {
  //       res.json(infoApi);
  //     }
  //   } catch (error) {}
});

router.post("/activities", async (req, res) => {
  const { nombre, dificultad, duracion, temporada } = req.body;
  try {
    const nueva = await Activity.create({
      nombre: nombre,
      dificultad: dificultad,
      duracion: duracion,
      temporada: temporada,
    });

    // let findPai = await Country.findAll({
    //   where: {
    //     name: nombre,
    //   },
    // });

    // nueva.addCountry(findPai);
    res.json(nueva);
  } catch (error) {
    res.status(404).send(error);
  }
});

// server.get("/countries", (req, res) => {});

module.exports = router;
