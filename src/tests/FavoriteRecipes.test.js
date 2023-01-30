import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import { FavoriteRecipes } from '../pages';

describe('Testa o componente <FavoriteRecipes />', () => {
  it('Verifica se o componente <FavoriteRecipes /> possui o botões informados.', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterAll).toBeInTheDocument();
    expect(filterMeal).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();
  });
  test('Verifica se o componente <FavoriteRecipes /> possui botões e estão funcionando.', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterAll);
    userEvent.click(filterMeal);
    userEvent.click(filterDrink);
  });
});
