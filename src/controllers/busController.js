const BusService = require("../services/BusServices.js");

const getBuses = async (req,res,next) =>{
    try {
        const buses = await BusService.AllBuses();

        res.status(200).json(buses);
    }catch (error) {
        next(error);
    }
};

const getBusById = async(req,res,next) =>{
    try {
        const bus = await BusService.BusById(Number(req.params.id));
        res.status(200).json(bus);
    }catch (error) {
        next(error);
    }
};

const createBus = async (req,res,next)=>{
    try {
        const newBus = await BusService.Create(req.body);
        res.status(201).json(newBus);
    }catch (error) {
        next(error);
    }
};

const updateBus = async (req,res,next)=>{
    try {
        const update = await BusService.Update(Number(req.params.id),req.body);

        res.status(200).json(update);
    }catch (error) {
        next(error);
    }
};

const deleteBus = async(req,res,next)=>{
    try {
        const bus =  await BusService.DeleteBus(Number(req.params.id));

        res.status(200).json(bus);
    }catch (error) {
        next(error);
    }   
};

const busXDriver = async (req,res,next) =>{
    try{
        const buses = await BusService.busByDriverId(Number(req.params.id));

        res.status(200).json(buses);
    }catch (error) {
        next(error);
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