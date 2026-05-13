let ratingStarGenerator = (rating, companyRating) => {
    let emptyStarsCount = 5 - companyRating;
    let fullStarsCount = 5 - emptyStarsCount;
 console.log("."+rating);
   
    for (let i = 1; i <= fullStarsCount; i++) {
        let ratingChildDiv = document.createElement("div");
        ratingChildDiv.setAttribute("class", "fullStar");
         document.querySelector("."+rating).append(ratingChildDiv);
    }
    for (let i = 1; i <= emptyStarsCount; i++) {
        let ratingChildDiv = document.createElement("li");
        ratingChildDiv.setAttribute("class", "emptyStar");
       
        document.querySelector("."+rating).append(ratingChildDiv);
    }
}