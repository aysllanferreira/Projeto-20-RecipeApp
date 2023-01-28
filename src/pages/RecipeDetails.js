import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getMealsByID, getDrinksByID,
  getMeals, getDrinks } from '../services/api';
import './RecipeDetails.scss';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const type = location.pathname.split('/')[1];
  const [recipeContinue, setRecipeContinue] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const types = location.pathname.split('/')[1];
    const id = location.pathname.split('/')[2];
    if (types === 'meals') {
      getMealsByID(id).then((data) => setRecipe(data.meals));
      getDrinks().then((data) => setRecommendation(data.drinks));
    } else {
      getDrinksByID(id).then((data) => setRecipe(data.drinks));
      getMeals().then((data) => setRecommendation(data.meals));
    }
  }, [location.pathname]);

  useEffect(() => {
    const myObj = {
      drinks: {},
      meals: {},
    };

    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(myObj));
    }

    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const id = location.pathname.split('/')[2];

    if (type === 'meals' && getStorage.meals[id] === undefined) {
      setRecipeContinue(true);
    } else if (type === 'drinks' && getStorage.drinks[id] === undefined) {
      setRecipeContinue(true);
    } else {
      setRecipeContinue(false);
    }
  }, [location.pathname, type]);

  // Se quiserem trocar o nome dessas variaveis, pode mudar!
  // So estou descontando minha frustracao com o linter, equipe! kkk

  const souInimigodoLinter = -11;
  const seguraAMagia = 6;
  const id = location.pathname.split('/')[2];

  const copyLinkToClipboard = () => {
    setCopied(true);
    const { href } = window.location;
    navigator.clipboard.writeText(href);
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
    const copyRecipe = [...recipe][0];
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
  const handleStartRecipe = () => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const idx = location.pathname.split('/')[2];
    if (type === 'meals') {
      getStorage.meals[idx] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getStorage));
    } else {
      getStorage.drinks[idx] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getStorage));
    }
  };

  return (
    <div className="recipe-details">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLinkToClipboard }
      >
        <img src="../images/searchIcon.svg" alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveRecipeLocalStorage }
        src={
          isFavorite ? '../images/blackHeartIcon.svg' : '../images/whiteHeartIcon.svg'
        }
      >
        <img
          src={
            isFavorite ? '../images/blackHeartIcon.svg' : '../images/whiteHeartIcon.svg'
          }
          alt="favorite"
        />
      </button>
      {copied && <p data--testid="copied-link">Link copied!</p>}
      <h1>Recipe Details</h1>
      {recipe.map((item, index) => (
        <div key={ index } className="recipe-details__container">
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
            className="recipe-details__container__img"
          />
          <h2 data-testid="recipe-title">{item.strMeal || item.strDrink}</h2>
          <h3 data-testid="recipe-category">{item.strCategory}</h3>
          {item.strAlcoholic && (
            <h3 data-testid="recipe-category">{item.strAlcoholic}</h3>
          )}
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(item).reduce((acc, key) => {
              if (key.includes('Ingredient') && item[key] !== '' && item[key] !== null) {
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
              width="360"
              height="315"
              src={ `https://www.youtube.com/embed/${item.strYoutube.slice(souInimigodoLinter)}` }
            />
          )}
        </div>
      ))}
      <h3>Recommendations</h3>
      <div className="recipe-details__recommendations">
        { recommendation.length > 0
        && recommendation.slice(0, seguraAMagia).map((item, index) => (

          <Link
            key={ index }
            to={
              `/${type === 'meals' ? 'drinks' : 'meals'}/${item.idMeal || item.idDrink}`
            }
          >
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recipe-details__recommendations__card"
            >
              <img
                src={ item.strMealThumb || item.strDrinkThumb }
                alt="recipe"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strMeal || item.strDrink}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="recipe-details__buttons">
        <Link
          to={
            `/${type === 'drinks' ? 'drinks' : 'meals'}/${id}/in-progress`
          }
        >
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipe }
          >
            { recipeContinue ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeDetails;
