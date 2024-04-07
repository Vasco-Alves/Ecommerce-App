
const dbConnect = require('./config/mongo');

const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
})

dbConnect();