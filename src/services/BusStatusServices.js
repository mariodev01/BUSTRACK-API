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

    if(!status){
        throw new Error("No existe estado con ese Id");
    }
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

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    const idS = BusStatusData.at(-1);

    const newS = {
        id: BusStatusData.length >= 1? idS.id + 1 : 1,
        BusId: body.bus_id,
        status: body.status,
        currentP: body.current_passengers,
        stop: body.stop
    };

    BusStatusData.push(newS);

    return newS;
};

const updateStatus = (id,body)=>{

    const status = GetStatusById(id);

    if(!body || Object.keys(body).length === 0) {
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

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    status.bus_id = body.bus_id;

    status.current_passengers = body.current_passengers;

    status.status = body.status;

    status.next_stop = body.current_passengers;

    return status;
};

const deleteStatus = (id)=>{
    const index = BusStatusData.findIndex(b => b.id === id);
    
    if (index > -1) {
    BusStatusData.splice(index, 1);
    }else{
        throw new Error(`No existe status registrado con ese Id ${index}`);
    };
}

function esNumero(valor) {
    return !isNaN(valor);
};


module.exports = {
    GetStatus,
    GetStatusById,
    CreateStatus,
    updateStatus,
    deleteStatus
};