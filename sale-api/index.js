const express = require('express');
const app = express();

app.use( express.json() )
const port = 8080;

const uri = 'mongodb+srv://ricoybarato2024:alvaro1560@tiendabd.uvlqd42.mongodb.net/?retryWrites=true&w=majority&appName=tiendaBD'

const mongoose = require('mongoose');
mongoose.connect(uri);

const {saleModel} = require("./models");
const CustomerService = require('./services/CustomerService');
const ProductService = require('./services/ProductService');

app.get('/', (req, res) => {
    res.send('Bienvenido al api de sale api');
});

app.get('/sales', async (req, res)=> {
    const sales = await saleModel.find({});
    res.json(sales);
});

app.get('/sales/:code', async (req, res)=> {
    const sale = await saleModel.find({dni:req.params.dni});
    res.json(sale);
});

app.post('/addsale', async (req, res)=> {
    console.log(req.body)
    try{
        const code = req.body.code;
        const customer_id = req.body.customer_dni;
        const product_id = req.body.product_code;
        const quantify = req.body.quantify;

        let customer = await CustomerService.get(customer_id)
        if (!customer){
            return res.status(500).json({mesage: 'customer no existe ' + error});

        }

        let product = await ProductService.get(product_id)
        if (!product){
            return res.status(500).json({mesage: 'product no existe ' + error});

        }


        const sale = new saleModel({ code, customer_id, product_id, quantify});
        const data = await sale.save();
        return res.status(200).json(data);
    }catch(error){
        console.log('Error: ', error);
        return res.status(500).json({mesage: 'Error interno: ' + error});
    }
});


app.listen(port, () => {
    console.log("Servidor escuchando en http://localhost:" + port);
});