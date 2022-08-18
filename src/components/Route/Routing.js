import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import NotesPage from '../../pages/NotesPage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import FilmsAndBooksPage from '../../pages/FilmsAndBooksPage';
import ProductsPage from '../../pages/ProductsPage';
import HomePage from '../../pages/HomePage';
import UsersListPage from '../../pages/UsersListPage';
import UserDetailsPage from '../../pages/UserDetailsPage';

const Routing = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} exact={true} />

      <PrivateRoute path="/notes" exact={true}>
        <NotesPage />
      </PrivateRoute>

      <PrivateRoute path="/products" exact={true}>
        <ProductsPage />
      </PrivateRoute>

      <PrivateRoute path="/filmsandbooks" exact={true}>
        <FilmsAndBooksPage />
      </PrivateRoute>

      <RoleRoute role="OWNER" path="/users" exact={true}>
        <UsersListPage />
      </RoleRoute>

      <RoleRoute role="OWNER" path="/user/:id" exact={true}>
        < UserDetailsPage / >
      </RoleRoute>

      <PrivateRoute path="/" exact={true}>
        <HomePage />
      </PrivateRoute>

      <PrivateRoute path="*">
        <NotFoundPage / >
      </PrivateRoute>

    </Switch>
  );
};

export default Routing;
