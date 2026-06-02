import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import type { WorkLog } from '@repo/schemas';
import { useGetWorkLogsQuery } from '../api/worklog';

// Явно типизируем каждую колонку с помощью import type
const columns: GridColDef<WorkLog>[] = [  { 
    field: 'workerName', 
    headerName: 'Сотрудник', 
    flex: 1, 
    minWidth: 150,
    sortable: false,
    filterable: false,
  },
  { 
    field: 'workerTypeName', 
    headerName: 'Должность', 
    flex: 1, 
    minWidth: 130,
    sortable: false,
    filterable: false,
  },
  { 
    field: 'workTypeName', 
    headerName: 'Вид работы', 
    flex: 1, 
    minWidth: 180,
    sortable: false,
    filterable: false,
  },
  { 
    field: 'volume', 
    headerName: 'Объем', 
    type: 'number', 
    width: 100,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    filterable: false,
  },
  { 
    field: 'workTypeUnit', 
    headerName: 'Ед. изм.', 
    width: 100,
    sortable: false,
    filterable: false,
  },
  { 
    field: 'doneAt', 
    headerName: 'Дата выполнения', 
    type: 'date',
    width: 160,
    sortable: true,
    filterable: true,
    // Нативная сквозная типизация: string -> Date | null
    valueGetter: (value) => (value ? new Date(value) : null),
    valueFormatter: (value) => {
      if (!value) return '';
      const date = new Date(value)
      return date.toLocaleDateString('ru-RU');
    }
  }
];

const CustomToolbar = () => {
  return (
    <Box sx={{ p: 0.5, pb: 0, display: 'flex', justifyContent: 'flex-start' }}>
      <GridToolbarFilterButton />
    </Box>
  );
};

export const WorkLogTable = () => {
  const { data: worklogs = [], isLoading, isError } = useGetWorkLogsQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Не удалось загрузить данные журнала работ. Проверьте подключение к бэкенду.
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 500, width: '100%', mt: 2 }}>
      {worklogs.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ p: 4 }}>
          Журнал работ пуст. Добавьте первую запись.
        </Typography>
      ) : (
        <DataGrid
          rows={worklogs}
          columns={columns}
          pageSizeOptions={[]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
          disableColumnMenu
        />
      )}
    </Box>
  );
};
