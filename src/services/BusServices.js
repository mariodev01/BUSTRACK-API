const Buses = require("../Data/Buses");

const AllBuses = () =>{
    return {
        data: Buses
    };
};

const BusById = (id) =>{
    const Bus = Buses.find(b=> b.id === id);

    if(!Bus){
        throw new Error("No existe Bus con ese Id");        
    };

    return{
        Data: Bus
    };
};

const Create = (BusBody)=>{
    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    const idBus = Buses.at(-1);

    const newBus = {
        id: Buses.length >= 1? idBus.id + 1 : 1,
        plate: BusBody.plate,
        capacity: BusBody.capacity,
        driver_id: BusBody.driverId
    };

    Buses.push(newBus);
    return newBus;
};

const Update = (id,BusBody) => {
    const Bus = BusById(id);
    
    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };
    
    Bus.Data.plate = BusBody.plate;
    Bus.Data.capacity = BusBody.capacity;
    Bus.Data.driver_id = BusBody.driverId;

    return Bus;
};


const Delete = (id)=>{
    const index = Buses.findIndex(b => b.id === id);
    
    if (index > -1) {
    Buses.splice(index, 1);
    }else{
        throw new Error(`No existe bus con ese Id ${index}`);
    };
};

module.exports = {
    AllBuses,
    BusById,
    Create,
    Update,
    Delete
}