var selectedPageLoader=(type)=>{

    var templateURL;
    switch(type){
        case "login":
            templateURL="templates/login.htm";
          loadTemplateData(templateURL,type);
          break;

          case "signup":
            templateURL="templates/newSignup.htm";
          loadTemplateData(templateURL,type);
          break;

          case "forgotPassword":
            templateURL="templates/forgotPassword.htm";
          loadTemplateData(templateURL,type);
          break;

          case "productsPage":
            templateURL="templates/productDetails.htm"
            loadTemplateData(templateURL,type);
            break;
    }
}
var loadTemplateData=(loginTemplateURL,type)=>{
    axios.get(loginTemplateURL)
    .then(function(response){
        console.log(response);
        document.querySelector("main").innerHTML=response.data;
        if(type=="productsPage"){
            loadProductsData();
        }
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("Data Fetching Execution Completed.");
    })
}

selectedPageLoader("login");