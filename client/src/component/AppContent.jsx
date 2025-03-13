import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '../routes.jsx';

const AppContent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, idx) => (
          route.element && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.element />}
            />
          )
        ))}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/RealTimeMonitoring" element={<Navigate to="/RealTimeMonitoring" />} />
      </Routes>
    </Suspense>
  );
};

export default AppContent;