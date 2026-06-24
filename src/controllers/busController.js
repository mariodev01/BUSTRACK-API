const BusService = require("../services/BusServices.js");

const getBuses = (req,res) =>{
    try {
        const buses = BusService.AllBuses();

        res.json(buses);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getBusById = (req,res) =>{
    try {
        const bus = BusService.BusById(Number(req.params.id));
        res.status(200).json(bus);
    } catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};

const createBus = (req,res)=>{
    try {
        const newBus = BusService.Create(req.body);
        res.status(201).json(newBus);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateBus = (req,res)=>{
    try {
        const update = BusService.Update(Number(req.params.id),req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
};

const updatePartialBus = (req,res)=>{
    try{
        const update = BusService.PartialUpdate(Number(req.params.id),req.body);

        res.status(200).json(update);
    } catch(error){
        res.status(400).json({
            message:error.message
        });
    }
};

const deleteBus = (req,res)=>{
    try {
        const bus = BusService.Delete(Number(req.params.id));

        res.status(200).json(bus);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }    
};

const busXDriver = (req,res) =>{
    try{
        const buses = BusService.busByDriverId(Number(req.params.id));

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
    updatePartialBus
};