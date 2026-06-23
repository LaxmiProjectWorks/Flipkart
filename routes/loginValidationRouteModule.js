var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var { MongoClient } = require("mongodb");
var client = new MongoClient("mongodb://localhost:27017");


router.post("/loginValidation", async (req, res) => {

    console.log("Login API called");
    console.log(req.body);

    let responseData = {};

    try {
        const authResponse = await authenticateUser(req.body.emailID, req.body.password);

        if (authResponse.validUser) {

            console.log("Controller came inside");

            const user = authResponse.user;

            responseData.msg = "Success";
            
            responseData.userType = (user.isAdmin === "true") ? "admin" : "customer";

            //STORE USER IN SESSION
            req.session.isUserLoggedIn = true;

            req.session.user = {
                id: user._id,
                name: user.username,
                emailID: user.mail,
                isAdmin: (user.isAdmin === "true")  
            };
        } else {
            responseData.msg = "Fail";
        }

    } catch (err) {
        console.error("Login error:", err);
        responseData.msg = "Error";
    }

    res.send(responseData);
});

async function authenticateUser(emailID, password) {

    await client.connect();

    const db = client.db("flipkart");
    const collection = db.collection("user_details");

    const user = await collection.findOne({ mail: emailID });

    console.log("Printing DB data User:", user);

    let response = {
        validUser: false,
        user: null
    };

    if (!user) {
        console.log("User not found in DB");
        return response;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        response.validUser = true;
        response.user = user;
    }

    return response;

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