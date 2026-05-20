var addNewProductDataIntoDB = () => {

    var insertProductsURL = "/insertNewProducts/addProducts";

    const formData = new FormData();

    formData.append("title", document.getElementById("product_title").value);
    formData.append("price", document.getElementById("product_price").value);
    formData.append("category", document.getElementById("product_category").value);
    formData.append("rating", document.getElementById("product_rating").value);
    formData.append("description", document.getElementById("product_description").value);

    // ✅ IMPORTANT
    const file = document.getElementById("product_image").files[0];
    formData.append("image", file);

    axios.post(insertProductsURL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then((response) => {
        var pis = document.querySelector(".productInsertionStatus");

        if (response.data === "Success") {
            pis.style.display = "block";
            pis.innerText = "Product Added Successfully";
        } else {
            pis.style.display = "block";
            pis.innerText = "Product Failed to Add";
        }
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("addNewProductDataIntoDB execution completed.");
    });
};
``