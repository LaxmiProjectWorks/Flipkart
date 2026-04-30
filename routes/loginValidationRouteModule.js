var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");

  
router.post("/loginValidation", (req, res) => {
    console.log("I am loginValidation POST route/endpoint");
    console.log(req.body);
    var responseData = {};
    getDBConnection(req.body.username,req.body.password).then((isValid) => {
        if (isValid) {
            responseData.msg = "Success";
        } else {
            responseData.msg = "Fail";
        }
        res.send(responseData);
    });
});

async function getDBConnection(username,password,isValid) {
    await client.connect();
    console.log("Connection established successfully.");
    var db = client.db("flipkart");
    var collection = db.collection("user_details");
    var result = await collection.find({ username: username }).toArray();
    if (result.length == 1) {
       var isValid = await bcrypt.compare(password, result[0].password);
        console.log("Printing isValid answer: ", isValid);
    }
    return isValid;
}

// we kept get request for understanding the concept we are not using this request in this file.
// router.get("/loginValidation", (req, res) => {
//     console.log("I am loginValidation GET route/endpoint");
//     console.log(req.query);
//     var responseData = {};
//     if (req.query.username == "Laxmi" && req.query.password == "Laxmi@123") { 
//         responseData.msg = "Success";

//         /* document.querySelector(".wrongCredentialsMsg").style.display = "none"; 
//          This code will not work because this file is related to Server-side and server-side files can not access DOM Structure */
//     } else {
//         responseData.msg = "Fail";
//         // document.querySelector(".wrongCredentialsMsg").style.display = "block";
//     }
//     res.send(responseData);
// });


module.exports = router;