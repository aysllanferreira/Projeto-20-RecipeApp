import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMealsByID, getDrinksByID } from '../services/api';
import searchImg from '../images/searchIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [storageChecked, setStorageChecked] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const copyLinkToClipboard = () => {
    const { location: { href } } = window;
    const spliHref = href.split('/');
    spliHref.pop();
    const newHref = spliHref.join('/');
    navigator.clipboard.writeText(newHref);
    setCopied(true);
  };

  const setFavorite = () => {
    const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getStorage !== null && getStorage.length > 0) {
      const filterStorage = getStorage.some((item) => item.id === id);
      if (filterStorage) {
        setIsFavorite(true);
      }
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    setFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveRecipeLocalStorage = () => {
    const copyRecipe = [...[recipe]][0];

    const getId = copyRecipe.idMeal || copyRecipe.idDrink;
    const getTypes = copyRecipe.strMeal ? 'meal' : 'drink';
    const getArea = copyRecipe.strArea ? copyRecipe.strArea : '';
    const getCategory = copyRecipe.strCategory ? copyRecipe.strCategory : '';
    const isAlcoholic = copyRecipe.strAlcoholic ? copyRecipe.strAlcoholic : '';
    const getName = copyRecipe.strMeal || copyRecipe.strDrink;
    const getImg = copyRecipe.strMealThumb || copyRecipe.strDrinkThumb;

    const myObj = {
      id: getId,
      type: getTypes,
      nationality: getArea,
      category: getCategory,
      alcoholicOrNot: isAlcoholic,
      name: getName,
      image: getImg,
    };
    const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([myObj]));
      setIsFavorite(!isFavorite);
    } else {
      const filterStorage = getStorage.filter((item) => item.id !== getId);

      if (filterStorage.length === getStorage.length) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...getStorage, myObj]));
        setIsFavorite(!isFavorite);
      }

      if (filterStorage.length < getStorage.length) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(filterStorage));
        setIsFavorite(!isFavorite);
      }
    }
    setFavorite();
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLinkToClipboard }
        src={ searchImg }
      >
        <img src={ searchImg } alt="share" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveRecipeLocalStorage }
        src={ isFavorite ? BlackHeart : WhiteHeart }
      >
        {isFavorite ? (
          <img
            src={ BlackHeart }
            alt="favorite"
          />
        ) : (
          <img
            src={ WhiteHeart }
            alt="favorite"
          />
        )}
      </button>
      {copied && <p data-testid="copied-link">Link copied!</p>}
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
