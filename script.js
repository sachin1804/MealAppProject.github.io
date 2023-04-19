const homeSection = document.getElementById("home-section");
const searchBtn = document.getElementById("search-btn");
const searchResultSection = document.getElementById("search-results-section");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const searchInput = document.getElementById("search-input");
const favourites = document.getElementsByClassName("Favourites");
let isFavourite = false;

let searchResultsDiv = document.createElement("div");
searchResultsDiv.className = "search-results";

let val = "";

searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchResultsDiv.innerHTML = "";
    searchResultSection.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerHTML = "Opps!! Sorry, We can't find your search please try something else";
    if (searchInput.value == "") {
        searchResultSection.append(h1)
        return;
    }
    fetch(url + searchInput.value)
        .then((response) => response.json())
        .then((data) => {
            if (data.meals == null) {
                searchInput.value = "";
                searchResultsDiv.append(h1);
                return;
            }

            val = searchInput.value;
            searchInput.value = "";
            for (let m in data.meals) {
                let myMeal = data.meals[m];
                let div = document.createElement("div");
                div.className = "result";
                div.innerHTML = ` 
                    <div class="meal-image"><img
                    src=${myMeal.strMealThumb}>
                    </div>
                    <div class="meal-details">
                    <a href="#">
                    <h3 onClick = "createDetailsPage(${myMeal.idMeal})">${myMeal.strMeal}</h3>
                    </a>
                    <button type="button" id = "${myMeal.idMeal}" onClick = "addToFavourites(${myMeal.idMeal})">Add To Favourites</button>
                    </div>
                    `
                searchResultsDiv.append(div);
            }
        })

    searchResultSection.append(searchResultsDiv);

})

function createDetailsPage(mealId) {
    console.log(mealId);
    fetch(url + val)
        .then((response) => response.json())
        .then((data) => {
            for (let i in data.meals) {
                if (data.meals[i].idMeal == mealId) {
                    let myMeal = data.meals[i];
                    console.log(myMeal);
                    let ingredients = [];
                    let count = 1;
                    for (let j in myMeal) {
                        let ingredient = "";
                        let measure = "";
                        if (j.startsWith("strIngredient") && myMeal[j]) {
                            ingredient = myMeal[j];
                            measure = myMeal[`strMeasure` + count];
                            count += 1;
                            console.log(ingredient, measure);
                            ingredients.push(`${ingredient} ${measure}`);
                        }
                    }

                    console.log(ingredients);

                    let detailsSection = document.createElement("div");
                    detailsSection.id = "details-section";
                    detailsSection.innerHTML = `
                            <div class="meal-image-container">
                                <img src= ${myMeal.strMealThumb} />
                            </div>
                            <div class="meal-details-container">
                                <h1>${myMeal.strMeal}</h1>
                                <strong>Instructions:--</strong>
                                <p>${myMeal.strInstructions}</p>
                                <strong>Ingredients:--</strong>
                                <span>${ingredients.map((m) => m)}</span>
                            </div>
                        `
                    homeSection.innerHTML = "";
                    homeSection.style.background = "none";
                    homeSection.append(detailsSection);
                    break;
                }
            }
        })
}


const favouriteItems = [];
function addToFavourites(mealId) {

    fetch(url + val)
        .then((response) => response.json())
        .then((data) => {
            for (let i in data.meals) {
                if (data.meals[i].idMeal == mealId) {
                    var myMeal = data.meals[i];
                    let meal = {
                        id: myMeal.idMeal,
                        mealName: myMeal.strMeal,
                        mealUrl: myMeal.strMealThumb
                    }

                    let contains = false;
                    for (let item of favouriteItems) {
                        if (item.id == meal.id) {
                            contains = true;
                            break;
                        }
                    }

                    if (!contains) {
                        favouriteItems.push(meal);
                        alert(myMeal.strMeal + " added to favourites");
                    }
                    else {
                        alert("This item is already added in favourites");
                    }

                    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
                }
            }
        })

}


