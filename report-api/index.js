const express = require('express');
const app = express();
const port = 8080;

app.get('/api/hola-mundo', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(port, () => {
    console.log("Servidor escuchando en http://localhost:${port}");
});