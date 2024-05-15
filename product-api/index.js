const express = require("express");
const uri = 'mongodb+srv://ricoybarato2024:alvaro1560@tiendabd.uvlqd42.mongodb.net/?retryWrites=true&w=majority&appName=tiendaBD'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080

const {productModel} = require("./models");

app.get('/', (req, res) => {
    res.send('Bienvenido al api de product api');
});

app.get('/products', async (req, res)=> {
    const products = await productModel.find({});
    res.json(products);
});

app.get('/product/:code', async (req, res)=> {
    const product = await productModel.find({code:req.params.code});
    res.json(product);
});

app.post('/addproduct', async (req, res)=> {
    console.log(req.body)
    try{
        const code = req.body.code;
        const name = req.body.name;
        const type = req.body.type;
        const price = req.body.price;
        const stok = req.body.stok;
        const product = new productModel({ code, name, type, price, stok});
        const data = await product.save();
        return res.status(200).json(data);
    }catch(error){
        console.log('Error: ', error);
        return res.status(500).json({mesage: 'Error interno: ' + error});
    }
});

app.listen(port, () => {
    console.log("Servidor escuchando en http://localhost:${port}");
});