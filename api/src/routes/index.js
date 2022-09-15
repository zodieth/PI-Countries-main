const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Activity, Country } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  const { name } = req.query;

  try {
    const countries = await Country.findAll();
    const info = await axios.get("https://restcountries.com/v3/all");

    const infoApi = await info.data.map((e) => {
      return {
        name: e.name.common,
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
          name: e.name.common,
          id: e.cca3,
          capital: e.capital ? e.capital[0] : "no papa",
          flag: e.flags[0],
          continente: e.continents[0],
        };
      });

      await Country.bulkCreate(infoApi);
      res.json(infoApi);
      console.log("creada");
    } else if (name) {
      let findName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
      if (findName) res.json(findName);
      else {
        res.status(404).send("Pais no existente");
      }
    } else {
      console.log("GET DE PAISES");
      res.json(infoApi);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;

  if (id && id.length === 3) {
    let findId = await Country.findAll({
      where: {
        id: id.toUpperCase(),
      },
    });
    if (findId) res.json(findId);
  } else if (id.length > 3) res.status(404).send("El ID no existe");
});

router.post("/activities", async (req, res) => {
  const { nombre, dificultad, duracion, temporada } = req.body;

  try {
    let nueva = await Activity.findOrCreate({
      where: {
        nombre: nombre,
        dificultad: dificultad,
        duracion: duracion,
        temporada: temporada,
      },
    });

    res.json(nueva);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
