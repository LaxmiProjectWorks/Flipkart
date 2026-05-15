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
        console.log("RES: ",res);
        if(res=="Success"){
            responseData.msg = "DataInsertedIntoDB";
            console.log("Request got from front-end to backend successfully");
        }else if(res=="Failed"){
            responseData.msg = "MailIDExisting";
        }
        
        response.send(responseData);
    });
});


async function insertIntoDB(request, response) {
      var hashedPassword= await bcrypt.hash(request.body.password,saltRounds);
    //   request.body.hashedPassword=hashedPassword;
    await client.connect();
    var db = client.db("flipkart");
    var collection = db.collection("user_details");
    var verifyDuplicateMail= await collection.find({"mail": request.body.mail}).toArray();

    console.log("verifyDuplicateMail: ",verifyDuplicateMail);
    if(verifyDuplicateMail.length==0){
        var result = await collection.insertOne({ "username": request.body.username, "mail": request.body.mail, "contact": request.body.contact, "password": hashedPassword });
        return "Success";
    }
        return "Failed";
}

module.exports = router;