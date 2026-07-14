const statusServices = require("../services/BusStatusServices");

const getStatus = (req,res) =>{
    try{
        const allStatus = statusServices.GetStatus();

        res.json(allStatus);
    }catch(error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getById = (req,res)=>{
    try{
        const one = statusServices.GetStatusById(Number(req.params.id));

        res.status(200).json(one);
    }catch(error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const createStatus = (req,res) =>{
    try{
        const newStatus = statusServices.CreateStatus(req.body);

        res.status(201).json(newStatus);
    }catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateStatus = (req,res) =>{
    try{
        const u = statusServices.updateStatus(Number(req.params.id),req.body);

        res.status(200).json(u);
    }catch(error) {
        res.status(400).json({
            message:error.message
        });
    }
};

const deleteStatus = (req,res)=>{
    try{
        const d = statusServices.deleteStatus(Number(req.params.id));

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