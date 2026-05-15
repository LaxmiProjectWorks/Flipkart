let ratingStarGenerator = (rating, companyRating) => {
    companyRating=parseInt(companyRating);
    console.log("Company Rating: ",companyRating);
    let emptyStarsCount = 5 - companyRating;
   
    for (let i = 1; i <= companyRating; i++) {
        let ratingChildDiv = document.createElement("span");
        ratingChildDiv.setAttribute("class", "fullStar");
         document.querySelector("."+rating).append(ratingChildDiv);

    }
    for (let i = 1; i <= emptyStarsCount; i++) {
        let ratingChildDiv = document.createElement("span");
        ratingChildDiv.setAttribute("class", "emptyStar");
       
        document.querySelector("."+rating).append(ratingChildDiv);
    }
}