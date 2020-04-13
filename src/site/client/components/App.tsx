import React from 'react';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <h1 className="main-heading">
        Horizon
      </h1>
    );
  }
}

export default hot(App);
