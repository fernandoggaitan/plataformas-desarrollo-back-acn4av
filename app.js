const express = require('express');
const app = express();
const port = 3000;
const connection = require('./db');

//Middleware de Express que se encarga de analizar los cuerpos de las peticiones con formato JSON.
app.use(express.json());

//Iniciamos el servidor.
app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});

//Request --> Objeto con la información del cliente.
//Response --> Objeto que le responde al cliente.

app.get( '/', (req, res) => {
    res.send("Bienvenida/o a mi sitio 4");
} );

app.get('/saludo/:nombre', (req, res) => {

    const nombre = req.params.nombre;

    res.send(`Hola, ${nombre}`);
});

app.get('/eventos', async (req, res) => {

    const query = `
        SELECT id, nombre, cupo
        FROM eventos
    `;

    try{
        const [results] = await connection.query(query);

        res.json({
            success: true,
            //results: results
            results
        });

    }catch(error){

        res.status(500).json({
            success: false,
            message: 'Error al intentar recuperar los eventos'
        });

    }

});