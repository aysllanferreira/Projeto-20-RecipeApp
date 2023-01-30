import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

function FavoriteRecipes() {
  const user = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [favorite, setFavorite] = useState(user);
  const [copys, setCopys] = useState('');
  const [filter, setFilter] = useState('all');

  function handleChange(event) {
    const { value } = event.target;
    setFilter(value);
  }

  function filterAll() {
    if (filter === 'all') return favorite;

    return favorite.filter((recipex) => recipex.type === filter);
  }

  const LinkCopied = ({ type, id }) => {
    const link = `http://localhost:3000/${type}s/${id}`;
    setCopys('Link copied!');
    navigator.clipboard.writeText(link);
  };

  const clickStorage = (id) => {
    const userFavorite = favorite.filter((item) => item.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(userFavorite));
    setFavorite(userFavorite);
  };

  const recipe = filterAll();

  return (
    <div>
      <Header title="Favorite Recipes" haveSearch={ false } />
      <button
        value="all"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ (event) => handleChange(event) }
      >
        All
      </button>
      <button
        value="meal"
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ (event) => handleChange(event) }
      >
        Meals
      </button>
      <button
        value="drink"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (event) => handleChange(event) }
      >
        Drinks
      </button>
      {favorite
        ? recipe.map((item, index) => {
          if (item.type === 'meal') {
            return (
              <section key={ index }>
                <Link to={ `${item.type}s/${item.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    alt={ `recipe ${item.name}` }
                    src={ item.image }
                    style={ { width: '100px' } }
                  />
                  <div>
                    {copys}
                  </div>
                  <div data-testid={ `${index}-horizontal-top-text` }>
                    {`${item.nationality} - ${item.category}`}
                  </div>
                  <div data-testid={ `${index}-horizontal-name` }>
                    {item.name}
                  </div>
                </Link>
                <button type="button" onClick={ () => LinkCopied(item) }>
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="share btn"
                    src={ shareIcon }
                  />
                </button>
                <button type="button" onClick={ () => clickStorage(item.id) }>
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favorite"
                  />
                </button>
              </section>
            );
          }
          return (
            <section key={ index }>
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  alt={ `recipe ${item.name}` }
                  src={ item.image }
                  style={ { width: '100px' } }
                />
                <div>{copys}</div>
                <div data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </div>
                <div data-testid={ `${index}-horizontal-name` }>
                  {item.name}
                </div>
              </Link>
              <button type="button" onClick={ () => LinkCopied(item) }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share btn"
                  src={ shareIcon }
                />
              </button>
              <button type="button" onClick={ () => clickStorage(item.id) }>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite btn"

                />
              </button>
            </section>
          );
        })
        : ''}
    </div>
  );
}

export default FavoriteRecipes;
