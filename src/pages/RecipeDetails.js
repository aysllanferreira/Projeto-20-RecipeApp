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
      getMealsByID(id).then((data) => setRecipe(data));
    } else {
      getDrinksByID(id).then((data) => setRecipe(data));
    }
  }, [location.pathname]);
  console.log(recipe);
  return (
    <div>RecipeDetails</div>
  );
}

export default RecipeDetails;
