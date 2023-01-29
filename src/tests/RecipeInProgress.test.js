import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const recipeCard = '0-recipe-card';
const ingrStep = '0-ingredient-step';

describe('Testa o componente DrinkHelper', () => {
  it('Testa se a receita aparece na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/');

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });
    const mealCard = screen.getByTestId(recipeCard);
    userEvent.click(mealCard);

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeButton);

    await waitFor(() => {
      expect(screen.getByTestId(ingrStep)).toBeInTheDocument();
    });

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishRecipeButton);
  });

  it('Testa se o estilo eh aplicado quando checkbox eh selecionado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/');

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });
    const mealCard = screen.getByTestId(recipeCard);
    userEvent.click(mealCard);

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeButton);

    await waitFor(() => {
      expect(screen.getByTestId(ingrStep)).toBeInTheDocument();
    });

    const checkbox = screen.getByTestId(ingrStep);
    userEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    });

    userEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toHaveStyle('text-decoration: none');
    });
  });
});
