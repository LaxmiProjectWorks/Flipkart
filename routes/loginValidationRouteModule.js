var express= require("express");
var router= express.Router();
var mongoClient= require("mongodb");
new new mongoClient()

router.get("/loginValidation",(req,res)=>{
    console.log("I am loginValidation GET route/endpoint");
    console.log(req.query);
    var responseData={};
    if(req.query.username=="Laxmi" && req.query.password=="Laxmi@123"){
        responseData.msg="Success";

        /* document.querySelector(".wrongCredentialsMsg").style.display = "none"; 
         This code will not work because this file is related to Server-side and server can not access DOM Structure */

    }else{
        responseData.msg="Fail";
       
        // document.querySelector(".wrongCredentialsMsg").style.display = "block";
    }
    res.send(responseData);
});

router.post("/loginValidation",(req,res)=>{
    console.log("I am loginValidation POST route/endpoint");
    console.log(req.body);
    var responseData={};
    if(req.body.username=="Laxmi" && req.body.password=="Laxmi@123"){
        responseData.msg="Success";
    }else{
        responseData.msg="Fail";
    }
    res.send(responseData);
});

module.exports=router;