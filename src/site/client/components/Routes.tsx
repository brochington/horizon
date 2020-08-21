import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import ColorPage from '../pages/ColorPage';


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/color" component={ColorPage} />
      </Switch>
    </Router>
  )
}

export default Routes;