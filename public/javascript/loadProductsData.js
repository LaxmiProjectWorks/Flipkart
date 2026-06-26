var hbtemplate;
var productDetailsList = [];
var productDataUrl = "/getProductDetails/products";
var loadProductsData = (event) => {

    var categoryType = (event != undefined) ? event.target.innerText : "All Products";
    if(event){
        console.log("Checking Jewellery Issue: ",event.target.innerText);
    }
    axios({
        method: "POST",
        //url: "https://fakestoreapi.com/products", // To get the data from the external service
        url: productDataUrl,
        data: { category: categoryType }
    }).then(function (response) {

        console.log("loadProductsData response printing: ", response.data);
        productDetailsList = response.data;
        showProductsData();
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        console.log("loadProductsData function execution completed.");
    })
}

var showProductsData = () => {
    var productContainer = document.querySelector(".productsContainer");
    productContainer.replaceChildren();
    for (var i = 0; i < productDetailsList.length; i++) {

        console.log("Rating data:", productDetailsList[i]);

        var pTemplate = hbtemplate(productDetailsList[i]);
        productContainer.insertAdjacentHTML("beforeend", pTemplate);
        var idVal = "rating_" + productDetailsList[i].id;
        var ratingValue = (productDetailsList[i].rating && productDetailsList[i].rating.rate) || 0;
        ratingStarGenerator(idVal, ratingValue);
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