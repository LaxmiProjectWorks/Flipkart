var hbtemplate;
var productDetailsList = [];

var loadProductsData = () => {

    axios({
        method: "GET",
        url: "https://fakestoreapi.com/products",
    }).then(function (response) {
        console.log("Printing response data length: ", response.data.length);
        console.log(response);
        productDetailsList = response.data;
        showProductsData();
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        console.log("loadProductsData function execution completed.")
    })
}

var showProductsData = () => {
    var productContainer= document.querySelector(".productsContainer");
    for(var i=0;i<productDetailsList.length;i++){
         var pTemplate= hbtemplate(productDetailsList[i]);
         productContainer.insertAdjacentHTML("beforeend", pTemplate);
    }
}

loadProductCardTemplate = () => {
    axios.get("templates/productCard.htm")
        .then(function (response) {
            console.log(response);
            hbtemplate = Handlebars.compile(response.data);
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            console.log("loadProductCardTemplate function execution execution.");
        })
}

loadProductCardTemplate();