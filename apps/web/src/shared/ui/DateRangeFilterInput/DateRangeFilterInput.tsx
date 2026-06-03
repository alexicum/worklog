import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { useGridRootProps } from '@mui/x-data-grid';
import type { GridFilterInputValueProps } from '@mui/x-data-grid';

/**
 * Выбор диапазона дат.
 */
export const DateRangeFilterInput = (props: GridFilterInputValueProps) => {
  const rootProps = useGridRootProps();
  const { item, applyValue, focusElementRef = null } = props;

  const filterTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  
  // Храним состояние фильтра как массив строк [датаС, датаПо]
  const [filterValueState, setFilterValueState] = useState<[string, string]>(
    item.value ?? ['', '']
  );
  const [applying, setIsApplying] = useState(false);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  // Синхронизация внешнего состояния (например, при сбросе фильтра)
  const itemValue = item.value ?? ['', ''];
  if (itemValue[0] !== filterValueState[0] || itemValue[1] !== filterValueState[1]) {
      setFilterValueState(itemValue);
  }

  // Обновление значения с задержкой (дебаунс) для плавности интерфейса
  const updateFilterValue = (startDate: string, endDate: string) => {
    clearTimeout(filterTimeout.current);
    setFilterValueState([startDate, endDate]);

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      // Передаем в стейт DataGrid чистый массив
      applyValue({ ...item, value: [startDate, endDate] });
    }, rootProps.filterDebounceMs);
  };

  const handleStartFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilterValue(event.target.value, filterValueState[1]);
  };

  const handleEndFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilterValue(filterValueState[0], event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'end',
        height: 48,
        pl: 1,
        gap: 2
      }}
    >
      <TextField
        name="start-date-input"
        label="С"
        type="date"
        variant="outlined"
        value={filterValueState[0]}
        onChange={handleStartFilterChange}
        inputRef={focusElementRef}
        slotProps={{ inputLabel: { shrink: true } }}

      />
      <TextField
        name="end-date-input"
        label="По"
        type="date"
        variant="outlined"
        value={filterValueState[1]}
        onChange={handleEndFilterChange}
        slotProps={{
          inputLabel: { shrink: true },
          // Индикатор применения фильтрации во время дебаунса
          input: applying ? { endAdornment: <SyncIcon sx={{ animation: 'spin 2s linear infinite', '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } } }} /> } : {},
        }}
      />
    </Box>
  );
};
