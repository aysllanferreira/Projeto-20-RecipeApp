import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import { FavoriteRecipes } from '../pages';
import favRecipes from './mocks/favoriteRecipes';

const horizontalFav = '0-horizontal-favorite-btn';
const filterBymeal = 'filter-by-meal-btn';

describe('Testa o componente <FavoriteRecipes />', () => {
  it('Verifica se o componente <FavoriteRecipes /> possui o botões informados.', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId(filterBymeal);
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterAll).toBeInTheDocument();
    expect(filterMeal).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();
  });
  test('Verifica se o componente <FavoriteRecipes /> possui botões e estão funcionando.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeal = screen.getByTestId(filterBymeal);
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterAll).toBeInTheDocument();
    expect(filterMeal).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();

    userEvent.click(filterAll);
    // Find GG by text
    const recipeName = screen.getByText('GG');
    expect(recipeName).toBeInTheDocument();
    userEvent.click(filterMeal);
    // Find Burek
    const recipeName2 = screen.getByText('Burek');
    expect(recipeName2).toBeInTheDocument();
    userEvent.click(filterDrink);
    // find GG
    const recipeName3 = screen.getByText('GG');
    expect(recipeName3).toBeInTheDocument();
  });

  it('Testa se salva receita nos favoritos', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    renderWithRouter(<FavoriteRecipes />);
    const favoriteRecipes = screen.getAllByTestId(horizontalFav);
    expect(favoriteRecipes).toHaveLength(1);

    userEvent.click(favoriteRecipes[0]);
    const favoriteRecipes2 = screen.getAllByTestId(horizontalFav);
    expect(favoriteRecipes2).toHaveLength(1);
  });

  it('Testa se copia para o clipboard', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    renderWithRouter(<FavoriteRecipes />);

    const shareBtn = screen.getAllByTestId('0-horizontal-share-btn');

    expect(shareBtn).toHaveLength(1);

    console.log(shareBtn[0]);
    userEvent.click(shareBtn[0]);
  });

  it('Testa filtros', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    renderWithRouter(<FavoriteRecipes />);

    const filterMeal = screen.getByTestId(filterBymeal);

    expect(filterMeal).toBeInTheDocument();

    userEvent.click(filterMeal);
  });

  it('Testa se os bototes de compartilhar e favoritar estao na tela', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    renderWithRouter(<FavoriteRecipes />);

    const shareBtn = screen.getAllByTestId('0-horizontal-share-btn');
    const shareBtn2 = screen.getAllByTestId('1-horizontal-share-btn');
    const shareBtn3 = screen.getAllByTestId('2-horizontal-share-btn');
    const favoriteBtn = screen.getAllByTestId(horizontalFav);
    const favoriteBtn2 = screen.getAllByTestId('1-horizontal-favorite-btn');
    const favoriteBtn3 = screen.getAllByTestId('2-horizontal-favorite-btn');

    expect(shareBtn).toHaveLength(1);
    expect(favoriteBtn).toHaveLength(1);
    expect(shareBtn2).toHaveLength(1);
    expect(favoriteBtn2).toHaveLength(1);
    expect(shareBtn3).toHaveLength(1);
    expect(favoriteBtn3).toHaveLength(1);

    userEvent.click(shareBtn[0]);
    userEvent.click(shareBtn2[0]);
    userEvent.click(shareBtn3[0]);
    userEvent.click(favoriteBtn[0]);
    userEvent.click(favoriteBtn2[0]);
    userEvent.click(favoriteBtn3[0]);
  });
});
