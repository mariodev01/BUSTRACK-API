const tripService = require("../services/tripService");

const getAllTrips = async (req,res)=>{
    try{
        const all = await tripService.allTrips();

        res.json(all);
    }catch(error){
        res.status(404).json({
            message: error.message
        });
    }
};
const getTripById = async (req,res)=>{
    try {
        const trip = await tripService.tripById(Number(req.params.id));

        res.status(200).json(trip);
    } catch(error) {
        res.status(404).json({
            message: error.message
        });
    }
};
const createTrip = async (req,res)=>{
    try{
        const {origin, destination, bus_id, status } = req.body;

        if (!origin || !destination || !bus_id || !status) 
        {
            return res.status(400).json({
                error: 'Faltan campos obligatorios',
                campos: ['origin', 'destination', 'bus_id', 'status'].filter(campo => !req.body[campo])
            });
        };

        const newTrip = await tripService.create(req.body);

        res.status(201).json(newTrip);
    }catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const updateTrip = async(req,res)=>{
    try {

        const {origin, destination, bus_id, status } = req.body;

        if (!origin || !destination || !bus_id || !status) 
        {
            return res.status(400).json({
                error: 'Faltan campos obligatorios',
                campos: ['origin', 'destination', 'bus_id', 'status'].filter(campo => !req.body[campo])
            });
        };

        const updatedTrip = await tripService.update(Number(req.params.id),req.body);

        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
};
const deleteTrip = async (req,res)=>{
    try{
        const deletedTrip = await tripService.deleteTrip(Number(req.params.id));

        res.status(200).json(deletedTrip);
    }catch (error) {
        res.status(404).json
        ({
            message: error.message
        });
    }
};


module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
};
