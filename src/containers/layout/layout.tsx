import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { UserProfile } from '../user-profile/user-profile';
import { Dashboard } from '../../components/dashboard/dashboard';
import { UsersList } from '../users-list/users-list';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { RouterEnum } from '../../types/enums';

export const Layout: FC = () => (
  <Router>
    <NavigationBar />
    <Switch>
      <Route exact path="/">
        <Redirect to={RouterEnum.PROFILE} />
      </Route>
      <Route exact path={RouterEnum.PROFILE}>
        <UserProfile />
      </Route>
      <Route exact path={RouterEnum.DASHBOARD}>
        <Dashboard />
      </Route>
      <Route exact path={RouterEnum.USERS_LIST}>
        <UsersList />
      </Route>
    </Switch>
  </Router>
);
