var express= require("express");
var router= express.Router();
var {MongoClient}=require("mongodb");
var client= new MongoClient("mongodb://localhost:27017");

router.post("/products",(request,response)=>{
    console.log("Request came to backend");
    getProductDetails().then((result)=>{
        console.log("Request entered into DB method");
        if(result!=null){
            response.send(result);
        }
        else{
            response.send("Fail");
        }
    });
})

async function getProductDetails(){
    console.log("DB operation started");
    await client.connect();
    console.log("getProductDetailsRouteModule DB connection established");
    var db= client.db("flipkart");
    var collection =db.collection("product_details");

    //find() returns cursor object
    var result = await collection.find().toArray(); // convert cursor to array
    return result;
}

module.exports=router;