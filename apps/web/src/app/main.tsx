import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from './providers/StoreProvider';
import { AppRouter } from './routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </React.StrictMode>
);
