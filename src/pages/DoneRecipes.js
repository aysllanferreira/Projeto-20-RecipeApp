import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [orinalRecipes, setOrinalRecipes] = useState([]);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesStorage);
    setOrinalRecipes(doneRecipesStorage);
  }, []);

  const shareRecipe = (index) => {
    const { type, id } = doneRecipes[index];
    const link = `http://localhost:3000/${type}s/${id}`;
    setCopied('Link copied!');
    navigator.clipboard.writeText(link);
  };

  const filterRecipes = (type) => {
    if (type === 'all') {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      return;
    }
    setDoneRecipes(orinalRecipes.filter((recipe) => recipe.type === type));
  };
  return (
    <div>
      <Header
        title="Done Recipes"
        haveSearch={ false }
      />
      {copied !== '' && <p>{copied}</p>}
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('meal') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drink') }
      >
        Drinks
      </button>

      {doneRecipes && doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '100px' } }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => shareRecipe(index) }
          >

            <img
              src={ shareIcon }
              alt="share"
            />
          </button>
          {recipe.tags && recipe.tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}

        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
