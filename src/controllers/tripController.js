const tripService = require("../services/tripService");

const get = (req,res)=>{
    try{
        const all = tripService.allTrips();

        res.json(all);
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
};
const getById = (req,res)=>{
    try {
        const one = tripService.tripById(Number(req.params.id));

        res.status(200).json(one);
    } catch(error) {
        res.status(404).json({
            message: error.message
        });
    }
};
const create = (req,res)=>{
    try{
        const newTrip = tripService.create(req.body);

        res.status(201).json(newTrip);
    }catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const update = (req,res)=>{
    try {
        const u = tripService.Update(Number(req.params.id),req.body);

        res.status(200).json(u);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
};
const deleteT = (req,res)=>{
    try{
        const d = tripService.Delete(Number(req.params.id));

        res.status(200).json(d);
    }catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};


module.exports = {
    get,
    getById,
    create,
    update,
    deleteT
};
