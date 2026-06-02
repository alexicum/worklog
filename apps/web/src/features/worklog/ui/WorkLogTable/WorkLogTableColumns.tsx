import type { GridColDef } from '@mui/x-data-grid';
import type { WorkLog } from '@repo/schemas';
import { WorkLogDeleteAction } from './WorkLogDeleteAction';

interface GetColumnsOptions {
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

/**
 * Функция генерации колонок для MUI DataGrid.
 * Фильтрация и сортировка разрешены строго для поля doneAt.
 */
export const getWorkLogTableColumns = ({ onDelete, isDeleting }: GetColumnsOptions): GridColDef<WorkLog>[] => [
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
      const date = new Date(value);
      return date.toLocaleDateString('ru-RU');
    }
  },
  {
    field: 'actions',      // Сменили на стандартное actions
    type: 'actions',       // Добавили нативный тип действий для оптимизации MUI
    headerName: 'Действия',
    width: 100,
    sortable: false,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <WorkLogDeleteAction 
        params={params} 
        onDelete={onDelete} 
        disabled={isDeleting} 
      />
    )
  }
];