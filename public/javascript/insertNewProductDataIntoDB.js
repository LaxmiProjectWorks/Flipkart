var addNewProductDataIntoDB = () => {

    var insertProductsURL = "/insertNewProducts/addProducts";

    // ✅ Get values
    const name = document.getElementById("product_title").value;
    const price = document.getElementById("product_price").value;
    const category = document.getElementById("product_category").value;
    const rating = document.getElementById("product_rating").value;
    const desc = document.getElementById("product_description").value;
    const file = document.getElementById("product_image").files[0];

    //const pis = document.querySelector(".productInsertionStatus");

    console.log(name, price, category, rating, desc);


    // ✅ REGEX
    const nameRegex = /^[a-zA-Z0-9\s]{3,50}$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const ratingRegex = /^[1-5]$/;
    const descRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]{10,200}$/;

    // ✅ EMPTY CHECK
    if (!name || !price || !category || !rating || !desc || !file) {
        showNewProductInsertionError("⚠️ All fields are required");
        return;
    }

    // ✅ NAME VALIDATION
    if (!nameRegex.test(name)) {
        showNewProductInsertionError("Product name must be 3–50 characters");
        return;
    }

    // ✅ PRICE VALIDATION
    if (!priceRegex.test(price)) {
        showNewProductInsertionError("Enter valid price (e.g. 100 or 99.99)");
        return;
    }

    // ✅ CATEGORY CHECK
    if (category === "") {
        showNewProductInsertionError("Please select a category");
        return;
    }

    // ✅ RATING VALIDATION
    if (!ratingRegex.test(rating)) {
        showNewProductInsertionError("Rating must be between 1 to 5");
        return;
    }

    // ✅ DESCRIPTION VALIDATION
    if (!descRegex.test(desc)) {
        showNewProductInsertionError("Please enter a valid Description and it must be 10–200 characters");
        return;
    }

    // ✅ IMAGE VALIDATION
    if (!file.type.startsWith("image/")) {
        showNewProductInsertionError("Only image files allowed");
        return;
    }

    // ✅ CREATE FORM DATA
    const formData = new FormData();

    formData.append("title", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("rating", rating);
    formData.append("description", desc);
    formData.append("image", file);

    // ✅ API CALL ONLY AFTER VALIDATION
    axios({
        method: "POST",
        url: insertProductsURL,
        data: formData
    })
        .then((response) => {

            if (response.data == "Success") {
                showNewProductInsertionSuccess("✅ Product Added Successfully");
            } else {
                showNewProductInsertionError("❌ Product Failed to Add");
            }
        })
        .catch((error) => {
            console.log(error);
            showNewProductInsertionError("❌ Something went wrong");
        })
        .finally(() => {
            console.log("addNewProductDataIntoDB execution completed.");
        });
};

function showNewProductInsertionError(message) {
    const box = document.querySelector(".productInsertionStatus");

    box.innerText = message;
    box.style.visibility = "visible";
    box.style.color = "red";
    console.log("Error function execution completed.");
}

function showNewProductInsertionSuccess(message) {
    const box = document.querySelector(".productInsertionStatus");

    box.innerText = message;
    box.style.visibility = "visible";
    box.style.color = "green";

    // ✅ CLEAR FORM FIELDS
    document.getElementById("product_title").value = "";
    document.getElementById("product_price").value = "";
    document.getElementById("product_category").value = "";
    document.getElementById("product_rating").value = "";
    document.getElementById("product_description").value = "";
    document.getElementById("product_image").value = ""; // ✅ clears file input

    console.log("Success function execution completed.");
}