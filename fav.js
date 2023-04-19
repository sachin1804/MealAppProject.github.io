
const favourites = document.querySelector(".Favourites");

const favouriteItems = JSON.parse(localStorage.getItem("favouriteItems"));
console.log(favouriteItems);

for (let item of favouriteItems) {
    let favDiv = document.createElement("div");
    favDiv.className = "fav";
    favDiv.id = "fav" + item.id;
    favDiv.innerHTML = ` 
        <div class="meal-image">
            <img src = ${item.mealUrl} alt="">
        </div>
        <div class="meal-details">
            <h3>${item.mealName}</h3>
            <button type="button" onClick = "removeFromFavourites(${item.id})">Remove from favourite</button>
        </div>
    `
    favourites.append(favDiv);
}


function removeFromFavourites(removeId) {
    for (let item of favouriteItems) {
        if (item.id == removeId) {
            let index = favouriteItems.indexOf(item);
            favouriteItems.splice(index, 1);
            alert(item.mealName + " removed from favourites");
            localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
            document.querySelector("#fav" + item.id).style.display = "none";
            localStorage.removeItem("value");
        }
    }
}

