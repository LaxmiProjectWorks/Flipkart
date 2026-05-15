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
        if(response.data.msg=="DataInsertedIntoDB")
        {
            document.querySelector(".signupResult").innerText="Registered successfully";
        }else if(response.data.msg=="MailIDExisting"){
            document.querySelector(".signupResult").innerText="An account is already created with given mail ID. Please try register with another mail ID.";
        }
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("New Signup process finished.");
    });
}