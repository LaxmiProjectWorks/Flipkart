var express= require('express');
var router= express.Router();

router.post("/getUserName",(request,response)=>{
    if(request.session.isUserLoggedIn){
        response.send({username:request.session.userName});
    }
    else{
        response.send({username:'invalidUser'});
    }
})

module.exports = router;