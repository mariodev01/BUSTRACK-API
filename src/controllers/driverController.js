const drivers = require("../Data/Drivers");
const ServiceDriver = require("../services/DriverServices");

const getDrivers = (req,res) =>{
    const drivers2 = ServiceDriver.getAllDrivers();

    res.json(drivers2);
};

const getDriverById = (req,res) =>{
    const driver2 = ServiceDriver.getDriverById(Number(req.params.id));

    if (!driver2){
        res.status(404).json("No entiendo porque, ya tu no me quieres ver");
        return;
    }

    res.status(200).json(driver2);
};

const createDriver = (req,res)=>{
    const newDriver = ServiceDriver.createDriver(req.body);

    res.status(201).json(newDriver);
};

const updateDriver = (req,res)=>{
    const driver = drivers.find(i=>i.id === Number(req.params.id));

    if (!driver){
        res.status(404).json("Baby llevo tiempo esperando una respuestaaaa tuyaaaa");
        return;
    };

    driver.nombre = req.body.nombre,
    driver.NumeroLicencia = req.body.license

    res.status(200).json(driver);
};

const deleteDriver = (req,res)=>{
    const driver = drivers.findIndex(i=>i.id === Number(req.params.id));

    if (driver === -1) {
        return res.status(404).json({
        message: "Conductor no encontrado"
        });
        return;
    };

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