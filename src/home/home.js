const APIData = 'https://www.themealdb.com/api/json/v1/1/categories.php';

document.addEventListener('DOMContentLoaded', () => {
  foodRawData();
});

async function foodRawData() {

  try {
    const response = await fetch(APIData);
    const data = await response.json();
    renderFoodItems(data.categories);
  }
  catch (error) {
    console.error('Error Fetching data:', error);
  }

}

function renderFoodItems(categories = []) {
  const categoryContainer = document.getElementById('categoryContainer');
  const homeField = document.getElementById('homeField');

  categoryContainer.innerHTML = "";

  if (categories.length === 0) {
    categoryContainer.innerHTML = '<p>No Categories are present to display</p>'
    return;
  }

  categories.forEach((category) => {
    const { strCategory, strCategoryThumb, strCategoryDescription } = category;
    const card = document.createElement('div')
    card.classList.add("itemCard");
    card.innerHTML = `
      <img src="${strCategoryThumb}" alt="${strCategory}" />
      <h3>${strCategory}</h3>
      <p>${strCategoryDescription}</p>
  `;

    categoryContainer.appendChild(card);

    homeField.innerHTML = `
      <a href="http://127.0.0.1:5500/src/index.html" id="homeField">Home</a>
`;
  })
}