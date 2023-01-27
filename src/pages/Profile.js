import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : null;

  return (
    <div>
      <Header
        title="Profile"
        haveSearch={ false }
      />
      <div>
        <div>
          <h3 data-testid="profile-email">{email}</h3>
          <Link
            data-testid="profile-done-btn"
            to="/done-recipes"
          >
            Done Recipes
          </Link>
          <Link
            data-testid="profile-favorite-btn"
            to="/favorite-recipes"
          >
            Favorite Recipes
          </Link>
          <Link
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
            to="/"
          >
            Logout
          </Link>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Profile;
