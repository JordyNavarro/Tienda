const express = require("express");
const uri = 'mongodb+srv://ricoybarato2024:alvaro1560@tiendabd.uvlqd42.mongodb.net/?retryWrites=true&w=majority&appName=tiendaBD'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080

const {customerModel} = require("./models");

app.get('/', (req, res) => {
    res.send('Bienvenido al api de Customers');
});

app.get('/customers', async (req, res)=> {
    const customers = await customerModel.find({});
    res.json(customers);
});

app.get('/customers/:dni', async (req, res)=> {
    const customer = await customerModel.find({dni:req.params.dni});
    res.json(customer);
});

app.post('/addcustomer', async (req, res)=> {
    console.log(req.body)
    try{
        const dni = req.body.dni;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const customer = new customerModel({ dni,name,lastname});
        const data = await customer.save();
        return res.status(200).json(data);
    }catch(error){
        console.log('Error: ', error);
        return res.status(500).json({mesage: 'Error interno: ' + error});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});