import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotesPage from '../../pages/NotesPage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import FilmsAndBooksPage from '../../pages/FilmsAndBooksPage';
import ProductsPage from '../../pages/ProductsPage';
import HomePage from '../../pages/HomePage';

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

      <PrivateRoute path="/" exact={true}>
        <HomePage />
      </PrivateRoute>

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routing;
