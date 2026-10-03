// middlewares/pgErrorHandler.js
const pgErrorHandler = (err, req, res, next) => {
    // Si NO es un error con código de Postgres, se lo pasa al siguiente middleware
    if (!err.code) {
        return next(err); 
    }

    // Si SÍ es un error de Postgres, lo procesa y responde
    switch (err.code) {
        case '23505': // UNIQUE violation
            return res.status(409).json({
                status: 409,
                error: 'Conflict',
                message: 'El registro ya existe en la base de datos.'
            });

        case '23503': // FOREIGN KEY violation
            return res.status(400).json({
                status: 400,
                error: 'Bad Request',
                message: 'La relación o ID especificado no existe.'
            });

        case '23502': // NOT NULL violation
            return res.status(400).json({
                status: 400,
                error: 'Bad Request',
                message: 'Faltan campos obligatorios por completar.'
            });

        default:
            // Si es un código de Postgres que no mapeaste de forma específica,
            // lo pasas al middleware global
            return next(err); 
    }
};

module.exports = pgErrorHandler;