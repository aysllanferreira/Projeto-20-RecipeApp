import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMealsByID, getDrinksByID } from '../services/api';

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [storageChecked, setStorageChecked] = useState([]);
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    const getType = history.location.pathname.split('/')[1];
    const getId = history.location.pathname.split('/')[2];

    if (getType === 'meals') {
      getMealsByID(getId).then((response) => setRecipe(response.meals[0]));
    } else {
      getDrinksByID(getId).then((response) => setRecipe(response.drinks[0]));
    }
  }, [history]);

  const handleChange = ({ target }) => {
    const targetChecked = target.checked;
    const { parentNode } = target;

    const pNodeTestId = parentNode.getAttribute('data-testid');

    if (targetChecked) {
      parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      // save in local storage
      localStorage.setItem(id, JSON
        .stringify({ ...JSON.parse(localStorage.getItem(id)), [pNodeTestId]: true }));
    } else {
      parentNode.style.textDecoration = 'none';
      // save in local storage
      localStorage.setItem(id, JSON
        .stringify({ ...JSON.parse(localStorage.getItem(id)), [pNodeTestId]: false }));
    }
  };

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem(id));
    if (getStorage && Object.keys(recipe).length > 0) {
      setStorageChecked(getStorage);

      // style the checked items
      const checkedItems = Object.keys(getStorage).filter((key) => getStorage[key]);
      checkedItems.forEach((item) => {
        const node = document.querySelector(`[data-testid="${item}"]`);
        node.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
        node.childNodes[0].checked = true;
      });
    }
  }, [id, recipe]);

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
                  <li key={ index }>
                    <label
                      htmlFor={ key }
                      data-testid={ `${key.split('Ingredient')[1] - 1}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ key }
                        name={ key }
                        value={ recipe[key] }
                        onChange={ handleChange }
                        checked={ storageChecked && storageChecked[key] }
                      />

                      {recipe[key]}

                    </label>

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
