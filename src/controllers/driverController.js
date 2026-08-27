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

const getDriverById = async (req,res) =>{
    try {
        const driver2 = await ServiceDriver.getDriverById(Number(req.params.id));

        res.status(200).json(driver2);
    } catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};

const createDriver = async (req,res)=>{
    try {
        const newDriver = await ServiceDriver.createDriver(req.body);

        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateDriver = async (req,res)=>{
    try {
        const update = await ServiceDriver.Update(Number(req.params.id),req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
};

const deleteDriver = async (req,res)=>{
    try {
        const driver = await ServiceDriver.Delete(Number(req.params.id));

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