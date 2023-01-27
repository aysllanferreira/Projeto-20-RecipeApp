import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealsByID, getDrinksByID } from '../services/api';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const type = location.pathname.split('/')[1];
    const id = location.pathname.split('/')[2];
    if (type === 'meals') {
      getMealsByID(id).then((data) => setRecipe(data.meals));
    } else {
      getDrinksByID(id).then((data) => setRecipe(data.drinks));
    }
  }, [location.pathname]);

  // Se quiserem trocar o nome dessas variaveis, pode mudar!
  // So estou descontando minha frustracao com o linter, equipe! kkk

  const souInimigodoLinter = -11;

  return (
    <div>
      <h1>Recipe Details</h1>
      {recipe.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strMeal || item.strDrink}</h2>
          <h3 data-testid="recipe-category">{item.strCategory}</h3>
          {item.strAlcoholic && (
            <h3 data-testid="recipe-category">{item.strAlcoholic}</h3>
          )}
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(item).reduce((acc, key) => {
              if (key.includes('Ingredient') && item[key] !== '') {
                return [...acc, item[key]];
              }
              return acc;
            }, []).map((ingredient, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${item[`strMeasure${i + 1}`]}`}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{item.strInstructions}</p>
          {item.strYoutube && (
            <iframe
              data-testid="video"
              title="recipe"
              width="420"
              height="315"
              src={ `https://www.youtube.com/embed/${item.strYoutube.slice(souInimigodoLinter)}` }
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default RecipeDetails;
