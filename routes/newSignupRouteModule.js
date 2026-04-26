var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");

router.post("/signup", (request, response) => {
    // console.log("Printing New User Register Request: ", request);
    var responseData = {};
    insertIntoDB(request, response).then((res)=>{
        responseData.msg = "Success";
        console.log("Request got from front-end to backend successfully");
        response.send(responseData);
    });
});


async function insertIntoDB(request, response) {
    await client.connect();
    var db = client.db("flipkart");
    var collection = db.collection("new_user_details");
    var result = collection.insertOne({ "username": request.body.username, "mail": request.body.mail, "contact": request.body.contact, "password": request.body.password });
    return result;
}

module.exports = router;