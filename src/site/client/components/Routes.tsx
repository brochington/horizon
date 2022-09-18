import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';

import ColorPage from '../pages/ColorPage';
import ShadowPage from 'pages/ShadowPage';
import SurfacePage from 'pages/SurfacePage';
import HeightPage from 'pages/HeightPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/height" element={<HeightPage />} />
      <Route path="/color" element={<ColorPage />} />
      <Route path="/shadows" element={<ShadowPage />} />
      <Route path="/surfaces" element={<SurfacePage />} />
    </Routes>
  );
};

export default AppRoutes;
