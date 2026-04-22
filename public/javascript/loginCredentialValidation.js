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
        console.log(response);
        if(response.data.msg=="Fail"){
            document.querySelector(".wrongCredentialsMsg").style.display = "block";
        }else{
            document.querySelector(".wrongCredentialsMsg").style.display="none";
            selectedPageLoader("productsPage");
        }
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("Execution completed.");
    })
}