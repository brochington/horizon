import React from "react";
import { hot } from "react-hot-loader/root";

import SideNav from "./SideNav";
import Routes from './Routes';



class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="column">
        <div className="row grow-1">
          <SideNav />
          <Routes />
        </div>
      </div>
    );
  }
}

export default hot(App);
