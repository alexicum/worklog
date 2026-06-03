import { useCallback, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridRowParams } from '@mui/x-data-grid';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import type { WorkLog } from '@repo/schemas';
import { useGetWorkLogsQuery, useDeleteWorkLogMutation } from '../../api/worklog';
import { getWorkLogTableColumns } from './WorkLogTableColumns';
import { CustomToolbar } from './CustomToolbar';

interface WorkLogTableProps {
  onEdit: (worklog: WorkLog) => void;
}

export const WorkLogTable = ({ onEdit }: WorkLogTableProps) => {
  const { data: worklogs = [], isLoading, isError } = useGetWorkLogsQuery();
  const [deleteWorkLog, { isLoading: isDeleting }] = useDeleteWorkLogMutation();

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись из журнала?')) {
      try {
        await deleteWorkLog(id).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        alert('Не удалось удалить запись. Попробуйте еще раз.');
      }
    }
  }, [deleteWorkLog]);

  // Прокидываем стабильную ссылку onEdit в генератор колонок
  const columns = useMemo(() => 
    getWorkLogTableColumns({ onEdit, onDelete: handleDelete, isDeleting }), 
    [onEdit, handleDelete, isDeleting]
  );

  // Обработчик двойного клика по строке
  const handleRowDoubleClick = useCallback((params: GridRowParams<WorkLog>) => {
    onEdit(params.row);
  }, [onEdit]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
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
        <Typography variant="body1" color="text.secondary" sx={{ align: 'center', p: 4 }}>
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
          disableColumnMenu
          onRowDoubleClick={handleRowDoubleClick}
          showToolbar
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            filterPanel: {
              sx: {
                width: '750px',
                maxWidth: '95vw'
              },
            },
          }}
        />
      )}
    </Box>
  );
};
