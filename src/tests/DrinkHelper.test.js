import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const recipeCard = '0-recipe-card';

describe('Testa o componente DrinkHelper', () => {
  it('Testa os filtros da tela de bebida', async () => {
    const { history } = renderWithRouter(<App />);
    const loginInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(loginInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234562');
    userEvent.click(loginButton);

    // expect window.location.pathname to be /comidas
    expect(history.location.pathname).toBe('/meals');

    const drinksButton = screen.getByTestId('drinks-btn');
    userEvent.click(drinksButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });

    const getAllCategories = await screen.findByTestId('All-category-filter');

    const getShakeCategory = await screen.findByTestId('Shake-category-filter');
    userEvent.click(getShakeCategory);

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });

    userEvent.click(getAllCategories);

    const getOrdinaryDrinkCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(getOrdinaryDrinkCategory);

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });
  });

  it('Testa se quando clica numa bebida, vai para outra rota', async () => {
    const { history } = renderWithRouter(<App />);
    const loginInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(loginInput, 'teste@teste.com');

    userEvent.type(passwordInput, '1234562');

    userEvent.click(loginButton);

    // expect window.location.pathname to be /comidas

    expect(history.location.pathname).toBe('/meals');

    const drinksButton = screen.getByTestId('drinks-btn');

    userEvent.click(drinksButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });

    const getFirstCard = await screen.findByTestId(recipeCard);

    userEvent.click(getFirstCard);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });
});
