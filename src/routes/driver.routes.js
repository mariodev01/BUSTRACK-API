const express = require("express");
const router = express.Router();
const drivers = require("../Data/Drivers");

//Lista de conductores
router.get("/", (req, res) => {
  res.json({
    Data: drivers
  });
});

//Crear conductor
router.post("/DriverCreate",(req,res)=>{

  if(req.body.nombre === "" || req.body.nombre === " " || req.body.nombre.Lenght <= 0){
    res.status(401).json("Nombre no puede estar vacio");
    return;
  }

  const newDriver = {
    id:req.body.id,
    nombre: req.body.nombre,
    NumeroLicencia: req.body.license
  };

  drivers.push(newDriver);

  res.status(201).json(newDriver);
});

//Obtener uno
router.get("/:id",(req,res)=>{
  const driver = drivers.find(i=>i.id === Number(req.params.id));

  if (!driver){
    res.status(404).json("No entiendo porque, ya tu no me quieres ver");
    return;
  }

  res.status(201).json(driver);
});

//Update Driver
router.put("/:id",(req,res)=>{
  const driver = drivers.find(i=>i.id === Number(req.params.id));

  if (!driver){
    res.status(404).json("Baby llevo tiempo esperando una respuestaaaa tuyaaaa");
    return;
  }

  driver.nombre = req.body.nombre,
  driver.NumeroLicencia = req.body.license

  res.status(201).json(driver);
});

//Delete Driver
router.delete("/:id",(req,res)=>{
  const driver = drivers.findIndex(i=>i.id === Number(req.params.id));

  if (driver === -1) {
    return res.status(404).json({
      message: "Conductor no encontrado"
    });

    return;
  }

  drivers.splice(driver,1);

res.json({
    message: "Conductor eliminado"
  });
})

module.exports = router;