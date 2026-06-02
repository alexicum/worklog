import type { GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { WorkLog } from '@repo/schemas';

interface WorkLogDeleteActionProps {
  params: GridRenderCellParams<WorkLog>;
  onDelete: (id: string) => Promise<void>;
  disabled: boolean;
}

export const WorkLogDeleteAction = ({ params, onDelete, disabled }: WorkLogDeleteActionProps) => {
  return (
    <Tooltip title="Удалить запись">
      <IconButton
        color="error"
        onClick={() => onDelete(params.row.id)}
        disabled={disabled}
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
