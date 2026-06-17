var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017/");

router.post("/categories", (request, response) => {
    getCategories().then((result) => {
        if(result!=null){
            console.log(result);
            response.send(result);
        }else{
            response.send("Fail");
        }

    })
});

async function getCategories() {
    await client.connect();
    var db= client.db("flipkart");
    var collection= db.collection("product_details");
    var result= await collection.distinct("category");
    return result;
}

module.exports=router;