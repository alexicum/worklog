import type { GridColDef } from '@mui/x-data-grid';
import type { WorkLog } from '@repo/schemas';
import { WorkLogDeleteAction } from './WorkLogDeleteAction';
import { WorkLogEditAction } from './WorkLogEditAction';
import { Box } from '@mui/material';
import { dateRangeFilterOperator } from '@/shared/ui/DateRangeFilterInput';

interface GetColumnsOptions {
  onEdit: (worklog: WorkLog) => void;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

/**
 * Функция генерации колонок для MUI DataGrid.
 * Фильтрация и сортировка разрешены строго для поля doneAt.
 */
export const getWorkLogTableColumns = ({ onEdit, onDelete, isDeleting }: GetColumnsOptions): GridColDef<WorkLog>[] => [
  { 
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
    valueGetter: (value) => (value ? new Date(value) : null),
    valueFormatter: (value) => {
      if (!value) return '';
      const cellDate = new Date(value);
      return cellDate.toLocaleDateString('ru-RU');
    },
    filterOperators: [dateRangeFilterOperator]
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Действия',
    width: 100,
    sortable: false,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <WorkLogEditAction 
          params={params} 
          onEdit={onEdit} 
          disabled={isDeleting} 
        />      
        <WorkLogDeleteAction 
          params={params} 
          onDelete={onDelete} 
          disabled={isDeleting} 
        />
      </Box>
    )
  }
];