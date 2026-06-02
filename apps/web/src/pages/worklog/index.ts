import { lazy } from 'react';

// Экспортируем страницу как Lazy-компонент для разделения бандла (code splitting)
export const WorkLogPageLazy = lazy(() => import('./ui/WorkLogPage'));
