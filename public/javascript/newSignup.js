let newUserSignup=()=>{
    var username_newUser=document.querySelector("#username_signup");
    var mail_newUser=document.querySelector("#mail_signup");
    var contact_newUser=document.querySelector("#contact_signup");
    var password_newUser=document.querySelector("#password_signup");

    var newUserDetails={
        username:username_newUser,
        mail:mail_newUser,
        conatct:contact_newUser,
        password:password_newUser
    }

    axios({
        method:"POST",
        url:"http://localhost:3000/newUserRegistration/signup",
        data:newUserDetails
    }).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("New Signup request sent to backend");
    });
}