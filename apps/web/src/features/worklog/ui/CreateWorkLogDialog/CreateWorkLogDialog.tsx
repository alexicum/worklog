import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateWorkLogMutation } from '../../api/worklog';
import { WorkLogForm } from '../WorkLogForm';
import type { CreateWorkLog } from '@repo/schemas';

interface CreateWorkLogDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateWorkLogDialog = ({ open, onClose }: CreateWorkLogDialogProps) => {
  // Вызываем мутацию создания записи из нашего Features API
  const [createWorkLog, { isLoading }] = useCreateWorkLogMutation();

  const handleSubmit = async (data: CreateWorkLog) => {
    // Выполняем запрос к Fastify-бэкенду и разворачиваем промис для перехвата ошибок в форме
    await createWorkLog(data).unwrap();
    onClose(); // Закрываем модальное окно только при успешном создании
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      slotProps={{
        paper: {
          sx: { p: 1, borderRadius: 2 }
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Добавление записи в журнал
        <IconButton onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <WorkLogForm key={'create'} onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};
