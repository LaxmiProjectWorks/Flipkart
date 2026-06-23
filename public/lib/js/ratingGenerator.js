// let ratingStarGenerator = (rating, companyRating) => {
//     companyRating=parseInt(companyRating);
//     console.log("Company Rating: ",companyRating);
//     let emptyStarsCount = 5 - companyRating;
   
//     for (let i = 1; i <= companyRating; i++) {
//         let ratingChildDiv = document.createElement("span");
//         ratingChildDiv.setAttribute("class", "fullStar");
//          document.querySelector("."+rating).append(ratingChildDiv);

//     }
//     for (let i = 1; i <= emptyStarsCount; i++) {
//         let ratingChildDiv = document.createElement("span");
//         ratingChildDiv.setAttribute("class", "emptyStar");
       
//         document.querySelector("."+rating).append(ratingChildDiv);
//     }
// }

let ratingStarGenerator = (ratingClass, companyRating) => {

    companyRating = parseInt(companyRating) || 0;

    const containers = document.querySelectorAll("." + ratingClass);

    if (!containers.length) return;

    containers.forEach(container => {

        // ✅ CLEAR OLD STARS
        container.innerHTML = "";

        let emptyStarsCount = 5 - companyRating;

        // ✅ FULL STARS
        for (let i = 0; i < companyRating; i++) {
            let star = document.createElement("span");
            star.className = "fullStar";
            container.append(star);
        }

        // ✅ EMPTY STARS
        for (let i = 0; i < emptyStarsCount; i++) {
            let star = document.createElement("span");
            star.className = "emptyStar";
            container.append(star);
        }
    });
};