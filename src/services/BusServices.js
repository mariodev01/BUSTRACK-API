const Buses = require("../Data/Buses");
const drivers = require("../Data/Drivers");
const Drivers = require("../Data/Drivers");

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
    const idBus = Buses.at(-1);

    const existePlaca = Buses.find(b=>b.plate === BusBody.plate);

    const existeConductor = drivers.find(d=>d.id === BusBody.driverId);

    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if (!esNumero(BusBody.capacity) || Number(BusBody.capacity) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if (existePlaca){
        throw new Error("Ya existe un bus con esa Placa");
    };

    if(existeConductor){
        const newBus = {
            id: Buses.length >= 1? idBus.id + 1 : 1,
            plate: BusBody.plate,
            capacity: Number(BusBody.capacity),
            driver_id: BusBody.driverId
        };

        Buses.push(newBus);
        return newBus;
    }else{
        throw new Error("Error,No existe conductor con ese ID");
    }
};

const Update = (id,BusBody) => {
    const Bus = BusById(id);
     
    const existePlaca = Buses.find(b=>b.plate === BusBody.plate);

    const existeConductor = drivers.find(d=>d.id === BusBody.driverId);

    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };
    
    if (!esNumero(BusBody.capacity) || Number(BusBody.capacity) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if (existePlaca){
        throw new Error("Ya existe un bus con esa Placa");
    };

    if(existeConductor){
        Bus.Data.plate = BusBody.plate;
        Bus.Data.capacity = Number(BusBody.capacity);
        Bus.Data.driver_id = BusBody.driverId;

        return Bus;
    }else{
        throw new Error("Error,No existe conductor con ese ID");
    }
};


const Delete = (id)=>{
    const index = Buses.findIndex(b => b.id === id);
    
    if (index > -1) {
    Buses.splice(index, 1);
    }else{
        throw new Error(`No existe bus con ese Id ${index}`);
    };
};

function esNumero(valor) {
    return typeof valor === 'number' && !isNaN(valor);
}


module.exports = {
    AllBuses,
    BusById,
    Create,
    Update,
    Delete
}