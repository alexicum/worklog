import { useCallback, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import { useGetWorkLogsQuery, useDeleteWorkLogMutation } from '../../api/worklog';
import { getWorkLogTableColumns } from './WorkLogTableColumns';
import { CustomToolbar } from './CustomToolbar';

export const WorkLogTable = () => {
  // Запрос данных через RTK Query
  const { data: worklogs = [], isLoading, isError } = useGetWorkLogsQuery();
  
  // Мутация удаления с автообновлением кэша
  const [deleteWorkLog, { isLoading: isDeleting }] = useDeleteWorkLogMutation();

  // Обработчик удаления
  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись из журнала?')) {
      try {
        await deleteWorkLog(id).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        alert('Не удалось удалить запись. Попробуйте еще раз.');
      }
    }
  }, [deleteWorkLog])

  const columns = useMemo(() => 
    getWorkLogTableColumns({ onDelete: handleDelete, isDeleting }), 
    [handleDelete, isDeleting]
  );

  if (isLoading) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
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
