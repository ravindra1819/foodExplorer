const searchAPIData = "www.themealdb.com/api/json/v1/1/filter.php?c=${Category}";

document.addEventListener('DOMContentLoaded', () => {
  searchRawData();
});

const searchRawData = async () => {

try{
  const response = await fetch(searchAPIData);
  const data = await response.json();
}

catch (error){
  console.log('Error fetching Data:', error);
};

}

function randomFoodItem () {

}