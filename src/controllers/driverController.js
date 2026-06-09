const drivers = require("../Data/Drivers");

const getDrivers = (req,res) =>{
    res.json({
        Data: drivers
    });
};

const getDriverByName = (req,res) =>{
    const driver = drivers.find(i=>i.nombre === req.params.nombre);

    if (!driver){
        res.status(404).json("No entiendo porque, ya tu no me quieres ver");
        return;
    }

    res.status(200).json(driver);
};

const createDriver = (req,res)=>{
    if(req.body.nombre === "" || req.body.nombre === " " || req.body.nombre.length <= 0){
        res.status(400).json("Nombre no puede estar vacio");
        return;
    }

    const newDriver = {
        id:Date.now(),
        nombre: req.body.nombre,
        NumeroLicencia: req.body.license
    };

    drivers.push(newDriver);

    res.status(201).json(newDriver);
};

const updateDriver = (req,res)=>{
    const driver = drivers.find(i=>i.nombre === req.params.nombre);

    if (!driver){
        res.status(404).json("Baby llevo tiempo esperando una respuestaaaa tuyaaaa");
        return;
    }

    driver.nombre = req.body.nombre,
    driver.NumeroLicencia = req.body.license

    res.status(200).json(driver);
};

const deleteDriver = (req,res)=>{
    const driver = drivers.findIndex(i=>i.nombre === req.params.nombre);

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
};


module.exports = {
    getDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};