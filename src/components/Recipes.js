import React from 'react';
import DrinkHelper from './DrinkHelper';
import MealHelper from './MealHelper';

function RecipesDisplay() {
  return (
    <div>
      { window.location.pathname === '/meals' && <MealHelper /> }
      { window.location.pathname === '/drinks' && <DrinkHelper /> }
    </div>
  );
}

export default RecipesDisplay;
