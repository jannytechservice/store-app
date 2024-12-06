import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routesConfig from './routesConfig';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routesConfig.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
