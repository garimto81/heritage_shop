
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import VIPManagementPage from './pages/VIPManagementPage';
import InviteVIPPage from './pages/InviteVIPPage';
import EditVIPPage from './pages/EditVIPPage';
import VIPLoungePage from './pages/VIPLoungePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="vips" element={<VIPManagementPage />} />
          <Route path="invite" element={<InviteVIPPage />} />
          <Route path="edit/:id" element={<EditVIPPage />} />
        </Route>

        {/* Client / Member Routes */}
        <Route path="/lounge">
          <Route path="home" element={<VIPLoungePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
