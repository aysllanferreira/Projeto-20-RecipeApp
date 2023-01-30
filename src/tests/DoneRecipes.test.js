import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import doneRecipes from './mocks/doneRecipesx';

const horizontalimg0 = '0-horizontal-image';
const horizontalimg1 = '1-horizontal-image';

describe('Testa a página DoneRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<DoneRecipes />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se o filtro All, drink e meal funciona', () => {
    const allButton = screen.getByTestId('filter-by-all-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');

    expect(allButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();

    userEvent.click(drinkButton);
    expect(screen.getAllByTestId(horizontalimg0)).toHaveLength(1);

    userEvent.click(mealButton);
    expect(screen.getAllByTestId(horizontalimg0)).toHaveLength(1);

    userEvent.click(allButton);
    expect(screen.getAllByTestId(horizontalimg0)).toHaveLength(1);
    expect(screen.getAllByTestId(horizontalimg1)).toHaveLength(1);
  });

  it('Testa se eh possivel compartilhar a receita', () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
