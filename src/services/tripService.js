const trips = require("../Data/Trip.js");
const bus = require("../Data/Buses.js");
const statusBus = require("../Data/BusStatus.js");

const isoDate = new Date().toISOString(); 
// Output: "2026-07-19T23:59:59.000Z"


const allTrips = ()=>{
    return {
        data: trips
    };
};

const tripById = (id)=>{
    const trip = trips.find(t=>t.id === id);

    if(!trip){
        throw new Error("No existe viaje con ese Id");
    };

    return trip;
};

const create = (tripBody)=>{
    const bus = ExisteBus(tripBody.bus_id);
    const infoBus = BusEstado(tripBody.bus_id);
    const statusTrip = trips.find(t=>t.bus_id === tripBody.bus_id);

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!bus){
        throw new Error("No existe bus con ese Id");
    };

    if(statusTrip.status === "IN_PROGRESS"){
        throw new Error("Este autobús ya tiene un viaje en curso.");
    };

    if(infoBus.status !== "ACTIVE"){
        throw new Error("El autobús no está disponible para iniciar un viaje.");
    }

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    }

    const idTrip = trips.at(-1);

    const newTrip = 
    {
        id: trips.length >= 1? idTrip.id + 1 : 1,
        bus_id: tripBody.bus_id,
        origin: tripBody.origin,
        destination: tripBody.destination,
        departure_time: "2026-07-16T08:00:00",
        arrival_time: null,
        status: null
    };
};

const Update = (id,tripBody)=>{
    const trip = tripById(id);

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!trip){
        throw new Error("No hay un viaje registrado con ese Id");
    };

    trip.bus_id = tripBody.bus_id;
    trip.origin = tripBody.origin;
    trip.destination = tripBody.destination;
    trip.arrival_time = isoDate;
    trip.status = body.status;

    return trip;
};

const Delete = (id)=>{
    const i = trips.findIndex(t=>t.id === id);

    if(i > -1){
        trips.splice(i,1);
    }else{
        throw new Error("No existe viaje registrado con ese Id");
    };
};

module.exports = {
    allTrips,
    tripById,
    create,
    Update,
    Delete
};

function ExisteBus(id){
    const exist = bus.find(b=>b.id === id );

    return exist;
};

function BusEstado(id){
    const info = statusBus.find(s=>s.bus_id === id);

    return info;
};