import { lazy } from 'react';

// Экспортируем страницу как Lazy-компонент для разделения бандла (code splitting)
export const WorkLogPageLazy = lazy(() => import('../../pages/worklog/ui/WorkLogPage'));

export { WorkLogTable } from './ui/WorkLogTable';
export { useGetWorkLogsQuery } from './api/worklog';