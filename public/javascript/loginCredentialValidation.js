var validateCredentials=()=>{
    var loginDetails={};
    loginDetails.username=document.querySelector("#username").value;
    loginDetails.password=document.querySelector("#password").value;

    // axios({
    //     method:'GET',
    //     url:'http://localhost:3000/validateLoginCredentials/loginValidation',
    //     params:loginDetails
    // })
    // .then(function(response){
    //     console.log(response);
    // }).catch(function(error){
    //     console.log(error);
    // }).finally(function(){
    //     console.log("Execution completed.");
    // })

    axios({
        method:'POST',
        url:'http://localhost:3000/validateLoginCredentials/loginValidation',
        data:loginDetails
    })
    .then(function(response){
        console.log("Printing response from login module: ",response);
        if(response.data.msg=="Success"){
            document.querySelector(".wrongCredentialsMsg").style.display="none";
            
            if(response.data.userType=="customer"){
                selectedPageLoader("productsPage");
            }
            else{
                selectedPageLoader("adminPage");
            }
        }else{
            document.querySelector(".wrongCredentialsMsg").style.display = "block";
        }
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("Execution completed.");
    })
}