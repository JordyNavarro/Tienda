const axios = require("axios");
module.exports={

    get:async function(code){
        const {data} = await axios.get("http://product_api:8080/products/"+code);
        return data[0]; 
    }
}