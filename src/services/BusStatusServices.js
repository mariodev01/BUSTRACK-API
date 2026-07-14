const BusStatusData = require("../Data/BusStatus");
const BusData = require("../Data/Buses");
const ValidStatus = ["ACTIVE","INACTIVE","MAINTENANCE"];

const GetStatus = () =>{
    return BusStatusData;
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

    if(existeBus(body.bus_id).length <= 0){
        throw new Error("No existe bus con ese id");
    };

    if(!ValidStatus.includes(body.status)){
        throw new Error("Estatus no permitido");
    };

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(Number(body.current_passengers) > existeBus(body.bus_id).capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };

    if(tieneEstado(Number(body.bus_id))){
        throw new Error("Ya existe un estado registrado para este autobús");
    };

    const idS = BusStatusData.at(-1);

    const newS = {
        id: BusStatusData.length >= 1? idS.id + 1 : 1,
        bus_id: Number(body.bus_id),
        status: body.status,
        current_passengers: Number(body.current_passengers),
        next_stop: body.next_stop
    };

    BusStatusData.push(newS);

    return newS;
};

const updateStatus = (id,body)=>{

    const status = GetStatusById(id);

    if(!body || Object.keys(body).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(existeBus(body.bus_id).length <= 0){
        throw new Error("No existe bus con ese id");
    };

    if(!ValidStatus.includes(body.status)){
        throw new Error("Estatus no permitido");
    };

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(Number(body.current_passengers) > existeBus(body.bus_id).capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };

    const currentStatus = BusStatusData.find(s=>s.bus_id === body.bus_id);

    // if(currentStatus.status === body.status){
    //     status.status = body.status;
    // }


    if(body.status === status.status){
        status.bus_id = body.bus_id;

        status.status = body.status;

        if(body.status === "INACTIVE" || body.status === "MAINTENANCE"){
            status.current_passengers = 0;
        }else{
            status.current_passengers = Number(body.current_passengers);
        };

        status.next_stop = body.next_stop;    
    }else if(tieneEstado(body.bus_id)){
        throw new Error("Ya existe un estado registrado para este autobús");
    };

    return status;

};

const deleteStatus = (id)=>{
    const index = BusStatusData.findIndex(b => b.id === id);
    
    if (index > -1) {
    BusStatusData.splice(index, 1);
    }else{
        throw new Error(`No existe status registrado con ese Id ${index}`);
    };
};

//Definir bien a ver que es lo que quieren
const busByStatus = (status)=>{
    //const buses
}

function esNumero(valor) {
    return !isNaN(valor);
};

function tieneEstado(BusID){
    const busEstado = BusStatusData.find(s=>s.bus_id === BusID);

    if(busEstado){
        if(busEstado.status !== ""){
            return true;
        }
        else
        {
            return false;
        }
    }else{
        return false;
    }    
};

function existeBus(busId){
    const BusExist = BusData.find(b=>b.id === busId);

    return BusExist;
};

module.exports = {
    GetStatus,
    GetStatusById,
    CreateStatus,
    updateStatus,
    deleteStatus
};