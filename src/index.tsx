import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import { ReduxProvider } from './store/store';
import { Layout } from './containers/layout/layout';
import './assets/global-styles';

const App: FC = () => {
  return (
    <ReduxProvider>
      <Layout />
    </ReduxProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
