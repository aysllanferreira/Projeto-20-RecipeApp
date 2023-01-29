import React, { useEffect, useState } from 'react';
import { getMealsByID, getDrinksByID } from '../services/api';

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [kindOfRecipe, setKindOfRecipe] = useState('');

  useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.split('/')[2];
    const kindOfRecipex = pathname.split('/')[1];
    setKindOfRecipe(kindOfRecipex);
    if (kindOfRecipex === 'meals') {
      const getMeals = async () => {
        const response = await getMealsByID(id);
        setRecipe(response.meals[0]);
      };
      getMeals();
    } else {
      const getDrinks = async () => {
        const response = await getDrinksByID(id);
        setRecipe(response.drinks[0]);
      };
      getDrinks();
    }
  }, [kindOfRecipe]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <h1>Recipe in progress</h1>
      {recipe && (
        <div>
          <h2 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h2>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt={ recipe.strDrink || recipe.strMeal }
          />

          <h3 data-testid="recipe-category">
            {recipe.strCategory || recipe.strAlcoholic}
          </h3>

          <h3>Instructions</h3>
          <p data-testid="instructions">{recipe.strInstructions}</p>

          <h3>Ingredients</h3>
          <ul>
            {Object.keys(recipe).map((key, index) => {
              if (key.includes('Ingredient') && recipe[key]) {
                return (
                  <li key={ index } data-testid={ `${index}-ingredient-step` }>
                    {recipe[key]}
                  </li>
                );
              }
              return null;
            })}
          </ul>

          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipesInProgress;
