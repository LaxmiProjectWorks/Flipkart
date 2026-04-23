var express = require("express");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");

router.get("/loginValidation", (req, res) => {
    console.log("I am loginValidation GET route/endpoint");
    console.log(req.query);
    var responseData = {};
    if (req.query.username == "Laxmi" && req.query.password == "Laxmi@123") {
        responseData.msg = "Success";

        /* document.querySelector(".wrongCredentialsMsg").style.display = "none"; 
         This code will not work because this file is related to Server-side and server-side files can not access DOM Structure */
    } else {
        responseData.msg = "Fail";
        // document.querySelector(".wrongCredentialsMsg").style.display = "block";
    }
    res.send(responseData);
});

async function getDBConnection(username,password) {
    await client.connect();
    console.log("Connection established successfully.");
    var db = client.db("flipkart");
    var collection = db.collection("user_credentials");
    var result = collection.find({ username: username, password: password }).toArray();
    return result;
}

router.post("/loginValidation", (req, res) => {
    console.log("I am loginValidation POST route/endpoint");
    console.log(req.body);
    var responseData = {};
    getDBConnection(req.body.username,req.body.password).then((result) => {
        console.log("Printing DB data: ", result);
        if (result.length==1) {
            responseData.msg = "Success";
        } else {
            responseData.msg = "Fail";
        }
        res.send(responseData);
    });
});

module.exports = router;