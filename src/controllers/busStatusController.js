const statusServices = require("../services/BusStatusServices");

const getStatus = async (req,res,next) =>{
    try{
        const allStatus = await statusServices.GetStatus();

        res.json(allStatus);
    }catch(error) {
        next(error);
    }
};

const getById = async(req,res,next)=>{
    try{
        const one = await statusServices.GetStatusById(Number(req.params.id));

        res.status(200).json(one);
    }catch(error) {
        next(error);
    }
};

const createStatus = async (req,res,next) =>{
    try{
        const newStatus = await statusServices.CreateStatus(req.body);

        res.status(201).json(newStatus);
    }catch(error) {
        next(error);
    }
};

const updateStatus = async (req,res,next) =>{
    try{
        const u = await statusServices.updateStatus(Number(req.params.id),req.body);

        res.status(200).json(u);
    }catch(error) {
        next(error);
    }
};

const deleteStatus = async (req,res,next)=>{
    try{
        const d = await statusServices.deleteStatus(Number(req.params.id));

        res.status(200).json(d);
    }catch(error) {
        next(error);
    }
};

module.exports = {
    getStatus,
    getById,
    createStatus,
    updateStatus,
    deleteStatus
}