// // const url = 
// const searchInput = document.getElementById("search-input");
// const detailsSection = document.getElementById("details-section");

// function createDetailsPage(mealId) {
//     console.log(mealId);
//     fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput.value)
//         .then((response) => response.json())
//         .then((data) => {
//             for (let i in data.meals) {
//                 if (data.meals[i].idMeal == mealId) {
//                     let myMeal = data.meals[i];
//                     let ingredients = [];
//                     let count = 1;
//                     for (let j in myMeal) {
//                         let ingredient = "";
//                         let measure = "";
//                         if (j.startsWith("strIngredient") && myMeal[j]) {
//                             ingredient = myMeal[j];
//                             measure = myMeal[`strMeasure` + count];
//                             count += 1;
//                             ingredients.push(` ${ingredient} ${measure} `);
//                         }

//                         console.log(myMeal.strMeal);

//                         detailsSection.innerHTML = ` 
//                             <div class="meal-image-container">
//                                 <img src= ${myMeal.strMealThumb} />
//                             </div>
//                             <div class="meal-details-container">
//                                 <h1>${myMeal.strMeal}</h1>
//                                 <strong>Instructions:--</strong>
//                                 <p>${myMeal.mealInstructions}</p>
//                                 <strong>Ingredients:--</strong>
//                                 <p>${ingredients}</p>
//                             </div>
//                         `
//                     }
//                 }
//             }


//         })


// }


