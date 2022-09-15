const { Router } = require("express");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Activity, Country } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  try {
    const countries = await Country.findAll();
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

      await Country.bulkCreate(infoApi);
      res.json(infoApi);
      console.log("creada");
    } else {
      console.log("GET DE PAISES");
      res.json(infoApi);
    }
  } catch (error) {
    res.status(404).send(error);
  }
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
