var express= require("express");
var router= express.Router();

router.post("/signup",(request,response)=>{
    console.log("Printing New User Register Request: ",request);
    console.log("Request got from front-end to backend successfully");
});

module.exports=router;