// Meals API

const findByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

const findByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

const findByFirstLetter = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};

const getMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

const getCategoryMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

const getMealsByCategoryClicked = async (meal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`);
  const data = await response.json();
  return data;
};

// Cocktails API

const findByIngredientCocktail = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

const findByNameCocktail = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

const findByFirstLetterCocktail = async (letter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};

const getDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

const getCategoryDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

const getDrinksByCategoryClicked = async (drink) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`);
  const data = await response.json();
  return data;
};

// Fetch by ID

const getMealsByID = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

const getDrinksByID = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export {
  findByIngredient,
  findByName,
  findByFirstLetter,
  findByIngredientCocktail,
  findByNameCocktail,
  findByFirstLetterCocktail,
  getDrinks,
  getMeals,
  getCategoryDrinks,
  getCategoryMeals,
  getDrinksByCategoryClicked,
  getMealsByCategoryClicked,
  getMealsByID,
  getDrinksByID,
};
