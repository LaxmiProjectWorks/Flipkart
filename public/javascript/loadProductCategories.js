var productCategoriesTemplate;
var productCategoriesList = [];
var categoryDataUrl = "/getProductCategories/categories";

var loadProductCategories = () => {
    axios({
        method: "POST",
        url: categoryDataUrl,
    }).then(function (response) {
        console.log("loadProductCategories response printing: ",response.data);
        productCategoriesList = response.data;
        showCategories();
    }).catch(function (error) {
        console.log("Failing at loadProductCategories()")
        console.log(error);
    }).finally(function () {
        console.log("loadProductCategories function execution completed.")
    })
}

loadProductCategoryTemplate = () => {
    axios.get("/templates/productCategory.htm")
    .then(function (response) {
        productCategoriesTemplate=Handlebars.compile(response.data);
    }).catch(function(error){
        console.log(error);
    }).finally(function(){
        console.log("Product Categories template loaded using handlebars");
    })
}

var showCategories = () => {
    var categoryContainer= document.querySelector(".productCategories");
    for(let i=0;i<productCategoriesList.length;i++){
        var pcTemplate= productCategoriesTemplate(productCategoriesList[i]);
         categoryContainer.insertAdjacentHTML("beforeend", pcTemplate);
    }
}

loadProductCategoryTemplate();
