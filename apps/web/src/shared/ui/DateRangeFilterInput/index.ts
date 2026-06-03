import type { GridFilterOperator } from '@mui/x-data-grid';
import { DateRangeFilterInput } from './DateRangeFilterInput';

export { DateRangeFilterInput };

/**
 * Универсальный оператор фильтрации диапазона дат для MUI DataGrid.
 */
export const dateRangeFilterOperator: GridFilterOperator = {
  label: 'Диапазон дат',
  value: 'dateRange',
  InputComponent: DateRangeFilterInput,
  getApplyFilterFn: (filterItem) => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
      return null;
    }

    const [startStr, endStr] = filterItem.value;
    if (!startStr && !endStr) {
      return null;
    }

    const startDate = startStr ? new Date(startStr) : null;
    const endDate = endStr ? new Date(endStr) : null;

    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(23, 59, 59, 999);

    return (value) => {
      if (!value) return false;
      
      const cellDate = value instanceof Date ? value : new Date(value);
      cellDate.setHours(0, 0, 0, 0);

      if (startDate && cellDate < startDate) return false;
      if (endDate && cellDate > endDate) return false;
      
      return true;
    };
  },
};
