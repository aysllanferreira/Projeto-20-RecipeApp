import React from 'react';
import PropTypes from 'prop-types';

function FinishRecipeBtn({
  isDisabled, finishRecipe,
}) {
  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !isDisabled }
      onClick={ finishRecipe }
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeBtn.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  finishRecipe: PropTypes.func.isRequired,
};

export default FinishRecipeBtn;
