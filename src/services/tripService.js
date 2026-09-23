const db = require("../config/db");

const validStatus = ["IN_PROGRESS","FINISHED","CANCELLED"];

const allTrips = async()=>{
    const sql = "SELECT * FROM Trips";
    const res = await db.query(sql);

    return res.rows;
};

const tripById = async (id)=>{
    const sql = "SELECT * FROM Trips WHERE id = $1";
    const valor = [id];
    const res = await db.query(sql,valor);

    return res.rows[0];
};

const create = async (tripBody)=>{
    const existe = await existeBus(tripBody.bus_id);
    const infoBus = await busEstado(tripBody.bus_id);
    
    const infoTrip = "SELECT * FROM trips WHERE bus_id = $1 and status = 'IN_PROGRESS' ";
    const info = "SELECT * FROM bus_estado WHERE bus_id = $1"
    const valor = [tripBody.bus_id];

    const result = await db.query(info,valor);
    const result2 = await db.query(infoTrip,valor);

    const registro = result.rows[0];
    const registro2 = result2.rowCount;

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(existe <= 0){
        throw new Error("No existe bus con ese Id");
    };

    if(infoBus <= 0){
        throw new Error("El bus no tiene estatus actualmente");
    }

    if(registro2 >=1){
        throw new Error("Ya el autobus tiene un viaje en progeso");
    }

    if(registro.estado !== "ACTIVE"){
        throw new Error("El autobús no está disponible para iniciar un viaje");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };
    // La función NOW() va directamente en la sintaxis SQL
    const sql = `
    INSERT INTO trips (bus_id, origin, destination, departure_time, arrival_time, status) 
    VALUES ($1, $2, $3, NOW(), $4, $5) 
    RETURNING *
    `;

    // // Ajustamos los índices de los parámetros (ahora son 5 en lugar de 6)
    const valores = [
    tripBody.bus_id,
    tripBody.origin,
    tripBody.destination,
    null,
    tripBody.status
    ];
    
    const res = await db.query(sql, valores);
    return res.rows[0];
};

const update = async (id,tripBody)=>{
    const trip = await tripById(id);
    const existe = await existeBus(tripBody.bus_id);
    const fecha = fechaActual();

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!trip){
        throw new Error("No hay un viaje registrado con ese Id");
    };

    if(existe <= 0){
        throw new Error("No existe bus con ese Id");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };

    // if(!validStatus.includes(tripBody.status)){
    //     throw new Error("Estatus no permitido");
    // };

    if(trip.status === "FINISHED"){
        throw new Error("Ya el viaje tiene status terminado");
    };

    const sql = "UPDATE Trips SET bus_id = $1,origin = $2,destination = $3,arrival_time = NOW(),status = $6 WHERE id = $7 RETURNING *";

    const valores = [tripBody.bus_id,tripBody.origin,tripBody.destination,tripBody.status,id];

    const res = await db.query(sql,valores);

    return res.rows[0];
};

const deleteTrip = async (id)=>{
    const sql = "DELETE FROM Trips where id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);

    return res.rowCount > 0;
};

module.exports = {
    allTrips,
    tripById,
    create,
    update,
    deleteTrip
};

async function existeBus(id){
    const sql = "SELECT * FROM buses WHERE id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);

    return res.rowCount;
};

async function busEstado(id){
    const sql = "SELECT * FROM bus_estado WHERE bus_id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);

    return res.rowCount;
};

function fechaActual(){
    const hoy = new Date();

    //Formato local según el navegador/país
    const fechaLocal = hoy.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return fechaLocal;
};