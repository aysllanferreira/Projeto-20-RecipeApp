import React from 'react';
import { useSelector } from 'react-redux';
import DrinkHelper from './DrinkHelper';
import MealHelper from './MealHelper';

function RecipesDisplay() {
  const { location } = useSelector((state) => state.headerSearch);

  return (
    <div>
      { location === '/meals' ? <MealHelper /> : <DrinkHelper /> }
    </div>
  );
}

export default RecipesDisplay;
