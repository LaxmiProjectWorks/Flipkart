var express= require('express');
var router= express.Router();

router.post("/getUserName", (req, res) => {

    if (req.session.isUserLoggedIn) {

        res.send({
            name: req.session.user.name,
            emailID: req.session.user.emailID,
            isAdmin: req.session.user.isAdmin
        });

    } else {
        res.send({ name: 'invalidUser' });
    }
});

module.exports = router;