const axios = require("axios");
module.exports={

    get:async function(dni){
        const {data} = await axios.get("http://customer_api:8080/customers/"+dni);
        return data[0]; 
    }
}