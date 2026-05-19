var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");

router.post("/products", (request, response) => {
    console.log("getProductDetailsRouteModule: ", request.body.category);
    getProductDetails((request.body.category).toLowerCase()).then((result) => {
        console.log("Request entered into DB method");
        if (result != null) {
            response.send(result);
        }
        else {
            response.send("Fail");
        }
    });
})

async function getProductDetails(productCategory) {
    console.log("DB operation started");
    await client.connect();
    var db = client.db("flipkart");
    var collection = db.collection("product_details");
    var result;
    if (productCategory != "all products") {
        //find() returns cursor object
        result = await collection.find({ category: productCategory }).toArray(); // convert cursor to array
    } else {
        result = await collection.find().toArray();
    }

    return result;
}

module.exports = router;