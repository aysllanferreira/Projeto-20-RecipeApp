import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import { Profile } from '../pages';

const PROFILE_DONE_BTN = 'profile-done-btn';
const PROFILE_FAVORITE_BTN = 'profile-favorite-btn';

describe('Testa o componente Profile', () => {
  test('Verifica se o componente <Profile /> possui o botao Done Recipes, Favorite Recipes e botao de Logout.', async () => {
    renderWithRouter(<Profile />);

    const profileButton = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId(PROFILE_DONE_BTN);
    const favoriteBtn = screen.getByTestId(PROFILE_FAVORITE_BTN);
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileButton).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  test('Verifica se o componente <Profile /> possui botões e estão funcionando.', async () => {
    renderWithRouter(<Profile />);
    const doneBtn = screen.getByTestId(PROFILE_DONE_BTN);
    const favoriteBtn = screen.getByTestId(PROFILE_FAVORITE_BTN);
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(doneBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(logoutBtn);
  });
  test('Teste se existe Links na página:', () => {
    renderWithRouter(<Profile />);
    const doneRecipes = screen.getByRole('link', { name: 'Done Recipes' });
    userEvent.click(doneRecipes);

    const favoriteRecipes = screen.getByRole('link', { name: 'Favorite Recipes' });
    userEvent.click(favoriteRecipes);

    const logout = screen.getByRole('link', { name: 'Logout' });
    userEvent.click(logout);
  });
  test('Verificar localStorage', () => {
    renderWithRouter(<Profile />);

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toBe(null);
  });
  test('Se redireciona para os caminhos corretos', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/done-recipes');

    fireEvent.click(screen.getByTestId(PROFILE_DONE_BTN));
    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/favorite-recipes');

    fireEvent.click(screen.getByTestId(PROFILE_FAVORITE_BTN));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se o email do usuário está sendo exibido na tela', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'joao@joao.com' }));
    const { getByTestId } = renderWithRouter(<Profile />);

    const email = getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email.innerHTML).toBe('joao@joao.com');
  });
});
