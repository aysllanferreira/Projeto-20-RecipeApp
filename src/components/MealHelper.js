import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryMeals, getMeals } from '../services/api';

class MealHelper extends Component {
  state = {
    arrayOfMeals: [],
    categories: [],
  };

  componentDidMount() {
    this.getarrayOfMeals();
    this.getObjectCategories();
  }

  getarrayOfMeals = async () => {
    const size = 12;
    const arrayOfMeals = await getMeals();
    const limitedTo12 = arrayOfMeals.meals.slice(0, size);
    this.setState({ arrayOfMeals: limitedTo12 });
  };

  getObjectCategories = async () => {
    const size = 5;
    const objectCategories = await getCategoryMeals();
    const limitedTo5 = objectCategories.meals.slice(0, size);
    this.setState({ categories: limitedTo5 });
  };

  render() {
    const { arrayOfMeals, categories } = this.state;
    return (
      <div>
        { categories.map((e) => (
          <button
            key={ e.strCategory }
            data-testid={ `${e.strCategory}-category-filter` }
          >
            { e.strCategory }
          </button>
        )) }

        { arrayOfMeals.map((e, index) => (

          <div
            data-testid={ `${index}-recipe-card` }
            key={ index }
            className="cardContainer"
          >
            <p data-testid={ `${index}-card-name` }>
              { e.strMeal }
            </p>

            <img
              alt={ e.strMeal }
              src={ e.strMealThumb }
              data-testid={ `${index}-card-img` }
              className="cardImage"
            />
          </div>
        )) }
      </div>
    );
  }
}

export default connect()(MealHelper);
