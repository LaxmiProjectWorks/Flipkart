var express = require("express");
var bcrypt=require("bcrypt");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");
var saltRounds=10;

router.post("/signup", (request, response) => {
     console.log("Printing New User Register Request: ", request);
    var responseData = {};
    insertIntoDB(request, response).then((res)=>{
        responseData.msg = "Success";
        console.log("Request got from front-end to backend successfully");
        response.send(responseData);
    });
});


async function insertIntoDB(request, response) {
      var hashedPassword= await bcrypt.hash(request.body.password,saltRounds);
    //   request.body.hashedPassword=hashedPassword;
    await client.connect();
    var db = client.db("flipkart");
    var collection = db.collection("user_details");
    var result = collection.insertOne({ "username": request.body.username, "mail": request.body.mail, "contact": request.body.contact, "password": hashedPassword });
    return result;
}

module.exports = router;