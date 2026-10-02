const errorHandler = (err, req, res, next) => {
  // 1. Imprimir el error en la consola del servidor para poder depurar
    console.error('❌ Error capturado:', err.stack || err.message);

  // 2. Determinar el código de estado HTTP:
  // Si el error trae un status (ej: 400, 404), lo usa; de lo contrario, asume 500 (Error del servidor).
    const statusCode = err.status || 500;

  // 3. Responder al cliente con un formato estándar y limpio
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Error interno del servidor'
    });
};

module.exports = errorHandler