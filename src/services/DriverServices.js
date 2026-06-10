const drivers = require("../Data/Drivers");

const getAllDrivers = ()=>{
    return drivers;
};

const getDriverById  =(id) =>{
    const driver = drivers.find(d=>d.id === id);

    if (!driver) {
        throw new Error("No existe conductor/a con ese Id");
    }

    return driver;
};



const createDriver = (driverBody) =>{
    const exists = drivers.find(d => d.NumeroLicencia === driverBody.license);

    if (exists) {
        throw new Error("La licencia ya existe");
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        throw new Error("Nombre no puede estar vacio");
        return;
    }

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        throw new Error("Licencia no puede estar vacio");
        return;
    }

    if (!driverBody || Object.keys(driverBody).length === 0) {

        throw new Error("Request body cannot be empty.");
        return;
    }

    const ID = drivers.at(-1);

    const newDriver = {
        id:ID.id + 1,
        nombre: driverBody.nombre,
        NumeroLicencia: driverBody.license
    };

    drivers.push(newDriver);
};


module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver
}