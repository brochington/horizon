import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';

import ColorPage from '../pages/ColorPage';
import ShadowPage from 'pages/ShadowPage';

const Routes = () => {
  return (
    <Switch>
      <Route path="/color" component={ColorPage} />
      <Route path="/shadows" component={ShadowPage} />
    </Switch>
  );
};

export default Routes;
