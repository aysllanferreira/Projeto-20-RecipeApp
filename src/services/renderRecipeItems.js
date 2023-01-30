const renderItems = (items) => {
  const getId = items.idMeal || items.idDrink;
  const getTypes = items.strMeal ? 'meal' : 'drink';
  const getArea = items.strArea ? items.strArea : '';
  const getCategory = items.strCategory ? items.strCategory : '';
  const isAlcoholic = items.strAlcoholic ? items.strAlcoholic : '';
  const getName = items.strMeal || items.strDrink;
  const getImg = items.strMealThumb || items.strDrinkThumb;

  return {
    id: getId,
    type: getTypes,
    nationality: getArea,
    category: getCategory,
    alcoholicOrNot: isAlcoholic,
    name: getName,
    image: getImg,
  };
};

export default renderItems;
