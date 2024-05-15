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

app.put('/updatecustomer/:id', async (req, res) => {
    const customerId = req.params.id;
    const { dni, name, lastname } = req.body;

    try {
        // Busca el cliente existente por ID
        const customer = await customerModel.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Actualiza los campos con los nuevos datos
        customer.dni = dni;
        customer.name = name;
        customer.lastname = lastname;

        // Guarda los cambios en la base de datos
        const updatedCustomer = await customer.save();

        return res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno: ' + error });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});