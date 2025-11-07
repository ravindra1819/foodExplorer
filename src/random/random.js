const randomAPIData = "https://www.themealdb.com/api/json/v1/1/random.php";

async function randomData() {

  try {
    const response = await fetch(randomAPIData);
    const data = await response.json();
    renderMealData(data.meals);
  }

  catch (error) {
    console.log('Error finding random item:', error);
  }
}

window.randomData = randomData;

function renderMealData(meals) {
  const meal = meals[0];
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube
  } = meal;

  // Collect Ingredients + Measures
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients += `<li>${measure} ${ingredient}</li>`;
    }
  }

  const randombtn = document.getElementById("randombtn");
  randombtn.innerHTML = `
  
  <section class="main-container"> 
  <button class="back-btn">← Back</button>

    <div class="meal-hero">
      <img class="meal-hero-img" src="${strMealThumb}" alt="${strMeal}">
      <div class="meal-hero-info">
        <h1>${strMeal}</h1>
        <span class="badge">${strCategory}</span>
        <span class="badge">${strArea}</span>
      </div>
    </div>

    <div class="meal-content">
      <div class="instructions">
        <h2 class="randomHeader">Instructions</h2>
        <p class="randomHeader">${strInstructions}</p>
      </div>

      <div class="ingredients">
        <h2>Ingredients</h2>
        <ul>${ingredients}</ul>
      </div>
    </div>

    <h2 class="randomHeader">Video Tutorial</h2>
    <div class="video-wrapper">
      <iframe width="98%" height="400"
        src="https://www.youtube.com/embed/${strYoutube?.split("v=")[1] || ""}"
        frameborder="0" allowfullscreen>
      </iframe>
    </div>
    </section>
  `;
}
