import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RoleRoute = ({role, children, ...rest}) => {
  const { isAuth, user  } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (isAuth && user && user.roles.indexOf(role) > -1) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/404',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default RoleRoute;
