import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';
import chickenMock from './mocks/chickenMock';

const recipePhoto = 'recipe-photo';
const drinkzinhos = '/drinks/15997';

describe('Testa se o link eh copiado para o clipboard e o texto aparece no html', () => {
  it('Testa se favorita e desfavorita do localStorage', async () => {
    // create a initial state to redux store
    const initialState = {
      headerSearch: {
        search: '',
        recipes: chickenMock,
      },
    };
    renderWithRouter(<App />, { initialState, route: '/meals/52771' });

    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    expect(localStorage.getItem('favoriteRecipes')).toBe(
      '[{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}]',
    );

    userEvent.click(favoriteBtn);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  });

  it('Testa se o link eh copiado para o clipboard e o texto aparece no html', async () => {
    // create a initial state to redux store
    const initialState = {
      headerSearch: {
        search: '',
        recipes: chickenMock,
      },
    };
    renderWithRouter(<App />, { initialState, route: drinkzinhos });

    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);

    const copiedLink = await screen.findByTestId('copied-link');
    expect(copiedLink).toBeInTheDocument();
  });

  it('Testa se a receita esta em progresso', async () => {
    // create a initial state to redux store
    const initialState = {
      headerSearch: {
        search: '',
        recipes: chickenMock,
      },
    };
    renderWithRouter(<App />, { initialState, route: '/meals/52771/' });

    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);

    // when click is done, will send you to route /in-progress
    expect(window.location.pathname).toBe('/');
  });

  it('Verifica as recomendacoes para meals', async () => {
    // create a initial state to redux store
    const initialState = {
      headerSearch: {
        search: '',
        recipes: chickenMock,
      },
    };
    renderWithRouter(<App />, { initialState, route: '/meals/52771' });

    await waitFor(() => expect(screen.getByTestId('4-recommendation-title')).toBeInTheDocument());

    const recomendedCard = screen.getByTestId('0-recommendation-card');
    const recomendedTitle = screen.getByTestId('0-recommendation-title');
    const recomendedImg = screen.getByTestId('0-card-img');
    expect(recomendedCard).toBeInTheDocument();
    expect(recomendedTitle).toBeInTheDocument();
    expect(recomendedImg).toBeInTheDocument();
  });

  it('Verifica o botao de continue receita e start receita', async () => {
    // create a initial state to redux store
    const initialState = {
      headerSearch: {
        search: '',
        recipes: chickenMock,
      },
    };
    renderWithRouter(<App />, { initialState, route: drinkzinhos });

    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());

    const findText2 = screen.getByText('Start Recipe');
    expect(findText2).toBeInTheDocument();

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);

    // when click is done, will send you to route /in-progress
    expect(window.location.pathname).toBe('/');
  });

  it('Testa a funcao saveRecipeLocalStorage', async () => {
    // create a initial state to redux store
    const initialState = {
      headerSearch: {
        search: '',
        recipes: chickenMock,
      },
    };
    renderWithRouter(<App />, { initialState, route: drinkzinhos });

    await waitFor(() => expect(screen.getByTestId(recipePhoto)).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    expect(localStorage.getItem('favoriteRecipes')).toBe(
      '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]',
    );

    userEvent.click(favoriteBtn);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  });
});
