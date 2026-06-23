var selectedPageLoader = (type) => {

    localStorage.setItem("lastPage", type);

    var templateURL;
    switch (type) {
        case "login":
            templateURL = "templates/login.htm";
            loadTemplateData(templateURL, type);
            break;

        case "signup":
            templateURL = "templates/newSignup.htm";
            loadTemplateData(templateURL, type);
            break;

        case "forgotPassword":
            templateURL = "templates/forgotPassword.htm";
            loadTemplateData(templateURL, type);
            break;

        case "productsPage":
            templateURL = "templates/productDetails.htm"
            loadTemplateData(templateURL, type);
            break;

        case "adminPage":
            templateURL = "templates/adminPage.htm"
            loadTemplateData(templateURL, type);
            break;
    }
}
var loadTemplateData = (loginTemplateURL, type) => {
    axios.get(loginTemplateURL)
        .then(function (response) {
            console.log(response);
            document.querySelector("main").innerHTML = response.data;
            if (type == "productsPage") {
                loadProductsData();
                loadProductCategories();
                getLoggedinUserName();
            } else if (type == "adminPage") {
                setTimeout(() => {
                    console.log("Calling getLoggedinUserName (admin)");

                    getLoggedinUserName();
                    initAdminChat();
                }, 300);   
            }
        else if (type == "login") {
    loadSavedCredentials();
}

        }).catch (function (error) {
    console.log(error);
}).finally(function () {
    console.log("Data Fetching Execution Completed.");
})
}

axios.post("http://localhost:3000/checkUserLoginSession/isLoggedin").then((response) => {
    if (response.data.isLoggedIn == "Loggedin") {

        const lastPage = localStorage.getItem("lastPage");

        if (lastPage) {
            selectedPageLoader(lastPage);   
        } else {
            selectedPageLoader("productsPage"); 
        }

    } else {
        selectedPageLoader("login");
    }

}).catch(function (error) {
    console.log(error);
    selectedPageLoader("login");
}).finally(function () {
    console.log("checkUserLoginSession Fetch API called");
});

var userloggingOut = () => {

    socket.disconnect();

    document.querySelector(".logout-btn").style.display="none";

    localStorage.removeItem("lastPage");

    axios.post("checkUserLoginSession/loggedOut").then(function (response) {
        console.log("Controller came to frontend.");
        console.log("Printing response: ", response);
        if (response.data.isSessionDestroyed == "sessionDestroyed") {
            selectedPageLoader("login");
        }
    }).catch(function (error) {
        console.log(error);
        selectedPageLoader("login");
    }).finally(function () {
        console.log("checkUserLoginSession Fetch API called");
    });
};

function loadSavedCredentials() {

    const rememberMe = localStorage.getItem("rememberMe");

    if (rememberMe === "true") {

        const savedEmail = localStorage.getItem("savedEmail");
        const savedPassword = localStorage.getItem("savedPassword");

        if (savedEmail) {
            document.getElementById("emailID").value = savedEmail;
        }

        if (savedPassword) {
            document.getElementById("password").value = savedPassword;
        }

        document.getElementById("rememberCredentials").checked = true;
    }
}

