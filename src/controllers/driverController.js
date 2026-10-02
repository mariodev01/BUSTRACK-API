const ServiceDriver = require("../services/DriverServices");

const getDrivers = async (req,res) =>{
    try {
        const drivers2 = await ServiceDriver.getAllDrivers();

        res.json(drivers2);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getDriverById = async (req,res,next) =>{
    try {
        const driver2 = await ServiceDriver.getDriverById(Number(req.params.id));

        res.status(200).json(driver2);
    } catch (error) {
        next(error);
    }
};

const createDriver = async (req,res,next)=>{
    try {
        const newDriver = await ServiceDriver.createDriver(req.body);

        res.status(201).json(newDriver);
    } catch (error) {
        next(error);
    }
};

const updateDriver = async (req,res,next)=>{
    try {
        const update = await ServiceDriver.Update(Number(req.params.id),req.body);

        res.status(200).json(update);
    } catch (error) {
        next(error);
    }
};

const deleteDriver = async (req,res,next)=>{
    try {
        const driver = await ServiceDriver.Delete(Number(req.params.id));

        res.status(200).json(driver);
    } catch (error) {
        next(error);
    }    
};

module.exports = {
    getDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};