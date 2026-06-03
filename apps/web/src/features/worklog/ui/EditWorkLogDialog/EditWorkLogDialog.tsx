import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateWorkLogMutation } from '../../api/worklog';
import { WorkLogForm } from '../WorkLogForm';
import type { WorkLog, CreateWorkLog } from '@repo/schemas';

interface EditWorkLogDialogProps {
  open: boolean;
  worklog: WorkLog | null; // Передаем данные выбранной строки для редактирования
  onClose: () => void;
}

export const EditWorkLogDialog = ({ open, worklog, onClose }: EditWorkLogDialogProps) => {
  const [updateWorkLog, { isLoading }] = useUpdateWorkLogMutation();

  const handleSubmit = async (data: CreateWorkLog) => {
    if (!worklog) return;
    
    // Вызываем метод обновления, передавая строковый UUID и тело формы
    await updateWorkLog({ id: worklog.id, body: data }).unwrap();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Редактирование записи
        <IconButton onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        {/* 
          Ключ завязан на ID строки. 
          Если открывается другая запись, форма мгновенно пересоздается с её данными.
        */}
        <WorkLogForm 
          key={worklog?.id ?? 'empty'} 
          initialValues={worklog} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
          submitButtonText="Обновить"
        />
      </DialogContent>
    </Dialog>
  );
};
