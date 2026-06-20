// const socket = io();

var selectedPageLoader = (type) => {

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
                getLoggedinUserName();
            }
            
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            console.log("Data Fetching Execution Completed.");
        })
}

axios.post("http://localhost:3000/checkUserLoginSession/isLoggedin").then((response) => {
    if (response.data.isLoggedIn == "Loggedin") {
        selectedPageLoader("productsPage");
    }
    else {
        selectedPageLoader("login");
    }
}).catch(function (error) {
    console.log(error);
    //selectedPageLoader("login");
}).finally(function () {
    console.log("checkUserLoginSession Fetch API called");
});

var userloggingOut = () => {

    socket.disconnect();

    axios.post("checkUserLoginSession/loggedOut").then(function (response) {
        console.log("Controller came to frontend.");
        console.log("Printing response: ", response);
        if (response.data.isSessionDestroyed == "sessionDestroyed") {
            selectedPageLoader("login");
        }
    }).catch(function (error) {
        console.log(error);
        //selectedPageLoader("login");
    }).finally(function () {
        console.log("checkUserLoginSession Fetch API called");
    });
};

