import { Route, RouteProps } from 'react-router-dom';

import { Login } from '../pages/Account/Login';
import React from 'react';
import { AccountState } from '../store/account/types';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export const PrivateRoute = ({
  children,
  ...rest
}: RouteProps): JSX.Element => {

  const account: AccountState = useSelector((state: AppState) => state.account);
  // account.token = 'test';

  return <Route {...rest} render={() => (account.token ? children : <Login />)}></Route>;
};
