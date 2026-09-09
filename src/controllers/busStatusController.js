const statusServices = require("../services/BusStatusServices");

const getStatus = async (req,res) =>{
    try{
        const allStatus = await statusServices.GetStatus();

        res.json(allStatus);
    }catch(error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getById = async(req,res)=>{
    try{
        const one = await statusServices.GetStatusById(Number(req.params.id));

        res.status(200).json(one);
    }catch(error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const createStatus = async (req,res) =>{
    try{
        const newStatus = await statusServices.CreateStatus(req.body);

        res.status(201).json(newStatus);
    }catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateStatus = async (req,res) =>{
    try{
        const u = await statusServices.updateStatus(Number(req.params.id),req.body);

        res.status(200).json(u);
    }catch(error) {
        res.status(400).json({
            message:error.message
        });
    }
};

const deleteStatus = async (req,res)=>{
    try{
        const d = await statusServices.deleteStatus(Number(req.params.id));

        res.status(200).json(d);

    }catch(error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};

module.exports = {
    getStatus,
    getById,
    createStatus,
    updateStatus,
    deleteStatus
}