import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryMeals, getMeals, getMealsByCategoryClicked } from '../services/api';

class MealHelper extends Component {
  state = {
    arrayOfMeals: [],
    categories: [],
    originalMeals: [],
    isFiltered: false,
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
    this.setState({ originalMeals: limitedTo12 });
  };

  getObjectCategories = async () => {
    const size = 5;
    const objectCategories = await getCategoryMeals();
    const limitedTo5 = objectCategories.meals.slice(0, size);
    this.setState({ categories: limitedTo5 });
  };

  handleClick = async (e) => {
    const { isFiltered, originalMeals } = this.state;
    if (!isFiltered) {
      const size = 12;
      const response = await getMealsByCategoryClicked(e.target.innerHTML);
      const limitedTo12 = response.meals.slice(0, size);
      this.setState({
        arrayOfMeals: limitedTo12,
      });
      this.setState({ isFiltered: true });
    } else {
      this.setState({ arrayOfMeals: originalMeals });
      this.setState({ isFiltered: false });
    }
  };

  render() {
    const { arrayOfMeals, categories } = this.state;
    const { recipes } = this.props;
    const size = 12;
    const maxLength = recipes.slice(0, size);
    return (
      <div>
        { categories.map((e) => (
          <button
            key={ e.strCategory }
            data-testid={ `${e.strCategory}-category-filter` }
            onClick={ this.handleClick }
          >
            { e.strCategory }
          </button>
        )) }
        <button
          data-testid="All-category-filter"
          onClick={ this.getarrayOfMeals }
        >
          All
        </button>
        { maxLength.length > 0 ? (
          maxLength.map((e, index) => (
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
          ))
        ) : arrayOfMeals.map((e, index) => (
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
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.headerSearch.recipes,
});

MealHelper.propTypes = {}.isRequired;

export default connect(mapStateToProps)(MealHelper);
