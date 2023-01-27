import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryDrinks, getDrinks,
  getDrinksByCategoryClicked } from '../services/api';

class DrinkHelper extends Component {
  state = {
    arrayOfDrinks: [],
    categories: [],
    originalMeals: [],
    isFiltered: false,
  };

  componentDidMount() {
    this.getarrayOfDrinks();
    this.getObjectCategories();
  }

  getarrayOfDrinks = async () => {
    const size = 12;
    const arrayOfDrinks = await getDrinks();
    const limitedTo12 = arrayOfDrinks.drinks.slice(0, size);
    this.setState({ arrayOfDrinks: limitedTo12 });
    this.setState({ originalMeals: limitedTo12 });
  };

  getObjectCategories = async () => {
    const size = 5;
    const objectCategories = await getCategoryDrinks();
    const limitedTo5 = objectCategories.drinks.slice(0, size);
    this.setState({ categories: limitedTo5 });
  };

  handleClick = async (e) => {
    const { isFiltered, originalMeals } = this.state;
    if (!isFiltered) {
      const size = 12;
      const response = await getDrinksByCategoryClicked(e.target.innerHTML);
      const limitedTo12 = response.drinks.slice(0, size);
      this.setState({
        arrayOfDrinks: limitedTo12,
      });
      this.setState({ isFiltered: true });
    } else {
      this.setState({ arrayOfDrinks: originalMeals });
      this.setState({ isFiltered: false });
    }
  };

  render() {
    const { arrayOfDrinks, categories } = this.state;
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
        <button data-testid="All-category-filter" onClick={ this.getarrayOfDrinks }>
          All
        </button>
        { recipes.length > 0 ? (
          maxLength.map((e, index) => (
            <Link
              to={ `/drinks/${e.idDrink}` }
              key={ index }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="cardContainer"
              >
                <p data-testid={ `${index}-card-name` }>
                  { e.strDrink }
                </p>
                <img
                  alt={ e.strDrink }
                  src={ e.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  className="cardImage"
                />
              </div>
            </Link>
          ))
        ) : (
          arrayOfDrinks.map((e, index) => (
            <Link
              to={ `/drinks/${e.idDrink}` }
              key={ index }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="cardContainer"
              >
                <p data-testid={ `${index}-card-name` }>
                  { e.strDrink }
                </p>
                <img
                  alt={ e.strDrink }
                  src={ e.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  className="cardImage"
                />
              </div>
            </Link>
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.headerSearch.recipes,
});

DrinkHelper.propTypes = {}.isRequired;

export default connect(mapStateToProps)(DrinkHelper);
