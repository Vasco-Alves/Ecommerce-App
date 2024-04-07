
// Función que controla errores. Envía código 403 por defecto.
const handleHttpError = (res, message, code = 403) => {
    res.status(code).send(message)
}

module.exports = { handleHttpError }