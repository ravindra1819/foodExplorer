function handleClick() {
  // alert('button clicked !!')
  const searchField = document.getElementById('randombtn');
  searchField.innerHTML = `
  <h2 class="searchHeader">Search Receipes</h2>
    <div class="search-bar">
      <span class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>

      <input type="text" id="mealSearchInput" placeholder="Search for a meal... (e.g., chicken, pasta, curry)"
      />

      <button class="search-btn">Search</button>
    </div>
    <h5 class='searchTagName'>Try searching for: Chicken,Pasta,Dessert</h5>
  `;
  const inputEl = document.getElementById('mealSearchInput');
  inputEl.addEventListener('input', searchRawData);
}

const searchRawData = async (e) => {
  const searchList = document.getElementById('searchList');
  const searchLabelId = document.getElementById('searchLabelId')
  if (searchList) {
    searchList.remove();
  }
  if (searchLabelId) {
    searchLabelId.remove();
  }

  const searchAPIData = `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`;
  if (e.target.value) {
    try {
      const response = await fetch(searchAPIData);
      if (!response.ok) {
        throw new error(`Server Error:, ${response.status}`)
      }
      const data = await response.json();
      changeHandler(data.meals, e.target.value);
    }
    catch (error) {
      console.log('Error fetching Data:', error);
    };
  }
}

function changeHandler(meals, searchValue) {
  const randombtn = document.getElementById('randombtn');

  const searchLabel = document.createElement('h3');
  searchLabel.setAttribute('id', 'searchLabelId');
  searchLabel.innerText = `Results for "${searchValue}"`;

  const searchCard = document.createElement('div');
  searchCard.setAttribute('id', 'searchList');

  randombtn.append(searchLabel)
  randombtn.append(searchCard)

  meals.forEach(meal => {
    const { strMeal, strMealThumb, strArea } = meal;
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal-card');
    mealDiv.innerHTML = `
      <img src='${strMealThumb}' alt='${strMeal}' />
      <h4>${strMeal}</h4>
      <p>${strArea}</p>
      `;
    searchCard.appendChild(mealDiv)
  });
}

window.handleClick = handleClick;



