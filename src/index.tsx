import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';

import { Users } from './components/Users/users';
import './assets/global-styles';

const App: FC = () => {
  return (
    <div className={styles}>
      <Users name="Hello" />
    </div>
  );
};

const styles = css`
  height: 100%;
  width: 100%;
  background: green;
`;

ReactDOM.render(<App />, document.getElementById('root'));
