
require('dotenv').config();
const dbConnect = require('./config/mongo');
const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use('/api', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
})

dbConnect();

module.exports = app;