import type { GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { WorkLog } from '@repo/schemas';

interface WorkLogEditActionProps {
  params: GridRenderCellParams<WorkLog>;
  onEdit: (worklog: WorkLog) => void;
  disabled: boolean;
}

export const WorkLogEditAction = ({ params, onEdit, disabled }: WorkLogEditActionProps) => {
  return (
    <Tooltip title="Редактировать запись">
      <IconButton
        color="primary"
        onClick={() => onEdit(params.row)}
        disabled={disabled}
        size="small"
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
