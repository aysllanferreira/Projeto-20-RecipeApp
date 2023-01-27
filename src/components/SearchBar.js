import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { setRecipe } from '../redux/reducers/headerSearch';
import {
  findByIngredient,
  findByName,
  findByFirstLetter,
  findByIngredientCocktail,
  findByNameCocktail,
  findByFirstLetterCocktail,
} from '../services/api';
import Recipes from './Recipes';

function SearchBar() {
  const { search } = useSelector((state) => state.headerSearch);
  const [checked, setChecked] = useState('');
  const [recipes, setRecipes] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const showResults = async (byIngredient, byName, byFirstLetter) => {
    if (checked === 'ingredient') {
      const data = await byIngredient(search);
      return data;
    }
    if (checked === 'name') {
      const data = await byName(search);
      return data;
    }

    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const data = await byFirstLetter(search);
    return data;
  };

  const handleSearch = async () => {
    const { pathname } = location;
    if (pathname === '/meals') {
      const getResults = await showResults(
        findByIngredient,
        findByName,
        findByFirstLetter,
      );
      if (!getResults) return;
      setRecipes(getResults.meals);
    } else {
      const getResults = await showResults(
        findByIngredientCocktail,
        findByNameCocktail,
        findByFirstLetterCocktail,
      );
      if (!getResults) return;
      setRecipes(getResults.drinks);
    }
  };

  useEffect(() => {
    if (recipes === null) return;

    if (recipes.length === 1) {
      const { idMeal, idDrink } = recipes[0];
      if (idMeal) {
        history.push(`/meals/${idMeal}`);
      } else {
        history.push(`/drinks/${idDrink}`);
      }
    }
  }, [recipes, history]);

  useEffect(() => {
    if (recipes === null) return;

    if (recipes.length > 1) {
      dispatch(setRecipe(recipes));
    }
  }, [recipes, dispatch]);

  useEffect(() => {
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <label htmlFor="ingredient-radio">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-radio"
          value="ingredient"
          id="ingredient-radio"
          onChange={ () => setChecked('ingredient') }
        />
      </label>

      <label htmlFor="name-radio">
        Name of Recipe
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search-radio"
          value="name"
          id="name-radio"
          onChange={ () => setChecked('name') }
        />
      </label>

      <label htmlFor="first-letter-radio">
        Primeira Letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-radio"
          value="first-letter"
          id="first-letter-radio"
          onChange={ () => setChecked('first-letter') }
        />
      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        style={ { width: '100px' } }
        onClick={ handleSearch }
      >
        Buscar
      </button>

      <Recipes />
    </div>
  );
}

export default SearchBar;
