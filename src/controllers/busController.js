const BusService = require("../services/BusServices.js");

const getBuses = async (req,res) =>{
    try {
        const buses = await BusService.AllBuses();

        res.json(buses);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getBusById = async(req,res) =>{
    try {
        const bus = await BusService.BusById(Number(req.params.id));
        res.status(200).json(bus);
    } catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};

const createBus = async (req,res)=>{
    try {
        const newBus = await BusService.Create(req.body);
        res.status(201).json(newBus);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateBus = async (req,res)=>{
    try {
        const update = await BusService.Update(Number(req.params.id),req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
};

const deleteBus = async(req,res)=>{
    try {
        const bus =  await BusService.Delete(Number(req.params.id));

        res.status(200).json(bus);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }    
};

const busXDriver = async (req,res) =>{
    try{
        const buses = await BusService.busByDriverId(Number(req.params.id));

        res.json(buses);
    }
    catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};

module.exports = {
    getBuses,
    getBusById,
    createBus,
    updateBus,
    deleteBus,
    busXDriver,
};