const ServiceDriver = require("../services/DriverServices");

const getDrivers = (req,res) =>{
    try {
        const drivers2 = ServiceDriver.getAllDrivers();

        res.json(drivers2);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getDriverById = (req,res) =>{
    try {
        const driver2 = ServiceDriver.getDriverById(Number(req.params.id));

        res.status(200).json(driver2);
    } catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};

const createDriver = (req,res)=>{
    try {
        const newDriver = ServiceDriver.createDriver(req.body);

        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateDriver = (req,res)=>{
    try {
        const update = ServiceDriver.Update(Number(req.params.id),req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
};

const deleteDriver = (req,res)=>{
    try {
        const driver = ServiceDriver.Delete(Number(req.params.id));

        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }    
};


module.exports = {
    getDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};