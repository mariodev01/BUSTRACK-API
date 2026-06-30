const BusStatusData = require("../Data/BusStatus");
const BusData = require("../Data/Buses");
const ValidStatus = ["ACTIVE","INACTIVE","MAINTENANCE"];


const GetStatus = () =>{
    return{
        Data: BusStatusData
    };
};

const GetStatusById = (id) =>{
    const status = BusStatusData.find(s=>s.id === id);

    return status;
};

const CreateStatus = (body)=>{
    if (!body || Object.keys(body).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    const BusExist = BusData.find(b=>b.id === body.bus_id);

    if(!BusExist){
        throw new Error("No existe bus con ese id");
    };

    if(!ValidStatus.includes(body.status)){
        throw new Error("Estatus no permitido");
    };

    if(Number(body.current_passengers) > BusExist.capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };
};