const Trips = require("../Data/Trip");

const allTrips = ()=>{
    return Trips;
};

const tripById = (id)=>{
    const trip = Trips.find(t=>t.id === id);

    if(!trip){
        throw new Error("No existe viaje con ese Id");
    };

    return trip;
};

const create = (tripBody)=>{
    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    const idTrip = Trips.at(-1);

    const newTrip = 
    {
        id: Trips.length >= 1? idTrip.id + 1 : 1,
        bus_id: tripBody.bus_id,
        origin: tripBody.origin,
        destination: tripBody.destination,
        departure_time: "2026-07-16T08:00:00",
        arrival_time: null,
        status: null
    };


}