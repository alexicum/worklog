
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { WorkLogPageLazy } from '@/pages/worklog';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/worklog"
          element={
            <Suspense fallback={<div style={{ padding: '2rem' }}>Загрузка страницы...</div>}>
              <WorkLogPageLazy />
            </Suspense>
          }
        />
        
        <Route path="/" element={<Navigate to="/worklog" replace />} />
        
        {/* Обработка несуществующих роутов (404) */}
        <Route path="*" element={<Navigate to="/worklog" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
