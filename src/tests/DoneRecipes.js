import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import doneRecipes from './mocks/doneRecipesx';

describe('Testa a página DoneRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<DoneRecipes />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se a página contém os elementos corretos', () => {
    const header = screen.getByRole('heading', { level: 2, name: 'Done Recipes' });
    expect(header).toBeInTheDocument();

    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();

    const foodButton = screen.getByTestId('filter-by-meal-btn');
    expect(foodButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkButton).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam corretamente', () => {
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    const allRecipes = screen.getAllByTestId(/horizontal-image/i);
    expect(allRecipes.length).toBe(3);

    userEvent.click(foodButton);
    const foodRecipes = screen.getAllByTestId(/horizontal-image/i);
    expect(foodRecipes.length).toBe(2);

    userEvent.click(drinkButton);
    const drinkRecipes = screen.getAllByTestId(/horizontal-image/i);
    expect(drinkRecipes.length).toBe(1);

    userEvent.click(allButton);
    const allRecipesAgain = screen.getAllByTestId(/horizontal-image/i);
    expect(allRecipesAgain.length).toBe(3);
  });

  it('Testa se as receitas são renderizadas corretamente', () => {
    const allRecipes = screen.getAllByTestId(/horizontal-image/i);
    expect(allRecipes.length).toBe(3);

    const firstRecipe = screen.getByTestId('0-horizontal-image');
    expect(firstRecipe).toBeInTheDocument();

    const secondRecipe = screen.getByTestId('1-horizontal-image');
    expect(secondRecipe).toBeInTheDocument();

    const thirdRecipe = screen.getByTestId('2-horizontal-image');
    expect(thirdRecipe).toBeInTheDocument();

    // horizontal tag
    const firstRecipeTag = screen.getByTestId('0-horizontal-top-text');
    expect(firstRecipeTag).toBeInTheDocument();
  });
});
