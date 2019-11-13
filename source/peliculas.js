var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");

router.get("/peliculas", function (req, res, next) {
  try {
    //Impresión de las peliculas en consola
    console.log(peliculas);
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.get("/peliculas/comedia", (req, res) => {
  let comedia = peliculas.filter(pelicula => pelicula.genero == "Comedia")
  res.status(200).send({
    data: comedia,
    cantidad: comedia.length,
    mensaje: "Listando peliculas de comedia!",
  })
})

router.get("/peliculas/ubicacion/:ubicacion", (req, res) => {
  let ubicacion = req.params.ubicacion
  let enUbicacion = peliculas.filter(pelicula => pelicula.ubicacion == ubicacion)

  res.status(200).send({
    data: enUbicacion,
    cantidad: enUbicacion.length,
    mensaje: `Listando peliculas por ubicacion: ${ubicacion}`,
  })
})

router.get("/peliculas/nombre/:nombre", (req, res) => {
  let nombre = req.params.nombre
  let conNombre = peliculas.filter(pelicula => pelicula.nombre.includes(nombre))
  res.status(200).send({
    data: conNombre,
    cantidad: conNombre.length,
    mensaje: `Listando peliculas por nombre: ${nombre}`,
  })
})

router.get("/peliculas/entre/:inicio/:fin", (req, res) => {
  let inicio = req.params.inicio
  let fin = req.params.fin
  let entreFechas = peliculas.filter(peliculas => peliculas.anio >= inicio && peliculas.anio <= fin)

  res.status(200).send({
    data: entreFechas,
    cantidad: entreFechas.length,
    mensaje: `Listando peliculas entre ${inicio} - ${fin}`,
  })
})

router.delete("/peliculas/eliminar/sin/genero", (req, res) => {
  let eliminadas = peliculas.filter(pelicula => pelicula.genero == "" || pelicula.genero === " " )
  peliculas.forEach(function(pelicula){
    if(pelicula.genero == "" || pelicula.genero === " "){
      peliculas.splice(pelicula, 1)
    }
  })

  res.status(200).send({
    data: eliminadas,
    cantidad: peliculas.length - eliminadas.length,
    mensaje: `Eliminando peliculas sin genero o de genero vacio`,
  })

})


router.delete("/peliculas", function (req, res, next) {
  res.status(200).send({
    mensaje: "ESTOY EN EL ENDPOINT DE DELETE"
  });
});


module.exports = router;
