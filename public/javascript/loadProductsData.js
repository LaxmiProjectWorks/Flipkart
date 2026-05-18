
var hbtemplate;
var productDetailsList = [];
var dataUrl="/getProductDetails/products";
var loadProductsData = () => {

    axios({
        method: "POST",
        //url: "https://fakestoreapi.com/products", // To get the data from the external service
        url:dataUrl,
    }).then(function (response) {
        productDetailsList = response.data;
        showProductsData();
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        console.log("loadProductsData function execution completed.");
    })
}

var showProductsData = () => {
    var productContainer= document.querySelector(".productsContainer");
    for(var i=0;i<productDetailsList.length;i++){
         var pTemplate= hbtemplate(productDetailsList[i]);
         productContainer.insertAdjacentHTML("beforeend", pTemplate);
         var idVal= "rating_"+productDetailsList[i].id;
        ratingStarGenerator(idVal,productDetailsList[i].rating.rate);
    }
}

loadProductCardTemplate = () => {
    axios.get("templates/productCard.htm")
        .then(function (response) {
            console.log(response);
            hbtemplate = Handlebars.compile(response.data);
            
            //ratingStarGenerator("rating", response.data.rating.rate);
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            console.log("loadProductCardTemplate function execution execution.");
        })
}

loadProductCardTemplate();