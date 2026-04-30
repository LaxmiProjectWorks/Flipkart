let newUserSignup=()=>{
    var username_newUser=document.querySelector("#username_signup").value;
    var mail_newUser=document.querySelector("#mail_signup").value;
    var contact_newUser=document.querySelector("#contact_signup").value;
    var password_newUser=document.querySelector("#password_signup").value;

    var newUserDetails={
        username:username_newUser,
        mail:mail_newUser,
        contact:contact_newUser,
        password:password_newUser
    }

    axios({
        method:"POST",
        url:"http://localhost:3000/newUserRegistration/signup",
        data:newUserDetails
    }).then(function(response){
        console.log(response);
        document.querySelector(".signupResult").style.display="block";
        if(response.data.msg=="Success")
        {
            document.querySelector(".signupResult").innerText="Registered successfully";
        }else{
            document.querySelector(".signupResult").innerText="Registration failed";
        }
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("New Signup request sent to backend");
    });
}