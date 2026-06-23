var validateCredentials = () => {

    var loginDetails = {};
    loginDetails.emailID = document.querySelector("#emailID").value;
    loginDetails.password = document.querySelector("#password").value;

    console.log("Printing login details: ",loginDetails);

    const rememberMe = document.getElementById("rememberCredentials").checked;

    // ✅ SAVE OR REMOVE BASED ON CHECKBOX
    if (rememberMe) {
        localStorage.setItem("savedEmail", loginDetails.emailID);
        localStorage.setItem("savedPassword", loginDetails.password);
        localStorage.setItem("rememberMe", "true");
    } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
        localStorage.setItem("rememberMe", "false");
    }

    // The below I kept in comment for my reference
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
        method: 'POST',
        url: 'http://localhost:3000/validateLoginCredentials/loginValidation',
        data: loginDetails
    })
    .then(function(response) {

        console.log("Printing response from login module: ", response);

        if (response.data.msg == "Success") {

            document.querySelector(".wrongCredentialsMsg").style.visibility = "hidden";

            if (response.data.userType == "customer") {
                selectedPageLoader("productsPage");
                getLoggedinUserName();
                document.querySelector(".logout-btn").style.display="block";
            } else {
                selectedPageLoader("adminPage");
                document.querySelector(".logout-btn").style.display="block";
                getLoggedinUserName();
            }

        } else {
            document.querySelector(".wrongCredentialsMsg").style.visibility = "visible";
        }

    }).catch(function(error) {
        console.log(error);
    }).finally(function() {
        console.log("Execution completed.");
    });
}
