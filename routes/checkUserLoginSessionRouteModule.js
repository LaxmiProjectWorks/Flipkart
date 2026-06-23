var express = require('express');
var router = express.Router();

router.post("/isLoggedin", (request, response) => {

    console.log("Serious Matter: ", request.session.isUserLoggedIn, request.session.user);

    if (request.session.isUserLoggedIn) {

        response.send({
            isLoggedIn: "Loggedin", 
            name: request.session.user.name,
            emailID: request.session.user.emailID
        });

    } else {

        console.log("Debugging Name: session concept is failing.");

        response.send({
            isLoggedIn: "NotLoggedin"
        });
    }
});

router.post("/loggedOut", (request, response) => {

    // Since request.session.destroy() is a aynchronous method
    request.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return response.status(500).json({
                isSessionDestroyed: "failed"
            });
        }


        response.json({
            isSessionDestroyed: "sessionDestroyed"
        });
    });
});

module.exports = router;