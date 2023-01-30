import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const recipeCard = '0-recipe-card';
const ingrStep = '0-ingredient-step';
const recipePhoto = 'recipe-photo';
const startRecipe = 'start-recipe-btn';

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
      expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId(startRecipe);
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
      expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId(startRecipe);
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

  it('Testa se o link eh copiado para o clipboard e o texto aparece no html', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/');

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });
    const mealCard = screen.getByTestId(recipeCard);
    userEvent.click(mealCard);

    await waitFor(() => {
      expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId(startRecipe);
    userEvent.click(startRecipeButton);

    await waitFor(() => {
      expect(screen.getByTestId(ingrStep)).toBeInTheDocument();
    });

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);

    const copiedLink = await screen.findByTestId('copied-link');
    expect(copiedLink).toBeInTheDocument();
  });

  it('Testa se o botao de favoritar funciona', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/');

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });
    const mealCard = screen.getByTestId(recipeCard);
    userEvent.click(mealCard);

    await waitFor(() => {
      expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId(startRecipe);
    userEvent.click(startRecipeButton);

    await waitFor(() => {
      expect(screen.getByTestId(ingrStep)).toBeInTheDocument();
    });

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    // verify localStorage

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(1);
    expect(favoriteRecipes[0].id).toBe('15997');
    expect(favoriteRecipes[0].type).toBe('drink');
    expect(favoriteRecipes[0].category).toBe('Ordinary Drink');
    expect(favoriteRecipes[0].alcoholicOrNot).toBe('Optional alcohol');
    expect(favoriteRecipes[0].name).toBe('GG');
    expect(favoriteRecipes[0].image).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');

    userEvent.click(favoriteBtn);

    const favoriteRecipes2 = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes2).toHaveLength(0);
  });

  it('Testa o botao de finalizar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/');

    await waitFor(() => {
      expect(screen.getByTestId(recipeCard)).toBeInTheDocument();
    });
    const mealCard = screen.getByTestId(recipeCard);
    userEvent.click(mealCard);

    await waitFor(() => {
      expect(screen.getByTestId(recipePhoto)).toBeInTheDocument();
    });

    const startRecipeButton = screen.getByTestId(startRecipe);
    userEvent.click(startRecipeButton);

    await waitFor(() => {
      expect(screen.getByTestId(ingrStep)).toBeInTheDocument();
    });

    // check all checkboxes and click finish recipe
    // get all ingredient step data-testid
    const step0 = screen.getByTestId('0-ingredient-step');
    const step1 = screen.getByTestId('1-ingredient-step');
    const step2 = screen.getByTestId('2-ingredient-step');

    userEvent.click(step0);
    userEvent.click(step1);
    userEvent.click(step2);

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishRecipeButton);

    // check path
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
