import React from 'react';
import PropTypes from 'prop-types';

function CTOBtns({
  copyLinkToClipboard, searchImg, saveRecipeLocalStorage, isFavorite,
  BlackHeart, WhiteHeart,
}) {
  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLinkToClipboard }
        src={ searchImg }
      >
        <img src={ searchImg } alt="share" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveRecipeLocalStorage }
        src={ isFavorite ? BlackHeart : WhiteHeart }
      >
        {isFavorite ? (
          <img
            src={ BlackHeart }
            alt="favorite"
          />
        ) : (
          <img
            src={ WhiteHeart }
            alt="favorite"
          />
        )}
      </button>
    </>
  );
}

CTOBtns.propTypes = {
  copyLinkToClipboard: PropTypes.func.isRequired,
  searchImg: PropTypes.string.isRequired,
  saveRecipeLocalStorage: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  BlackHeart: PropTypes.string.isRequired,
  WhiteHeart: PropTypes.string.isRequired,
};

export default CTOBtns;
