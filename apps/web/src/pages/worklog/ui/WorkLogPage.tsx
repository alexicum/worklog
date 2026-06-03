import { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { WorkLog } from '@repo/schemas';
import { WorkLogTable, CreateWorkLogDialog, EditWorkLogDialog } from '@/features/worklog';

const WorkLogPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // Храним выбранную сущность для редактирования в стейте страницы
  const [selectedWorkLog, setSelectedWorkLog] = useState<WorkLog | null>(null);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Журнал работ
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateOpen(true)}
          sx={{ height: 42, borderRadius: 2, fontWeight: 'medium' }}
        >
          Добавить запись
        </Button>
      </Box>

      {/* Передаем функцию установки выбранной строки внутрь таблицы */}
      <WorkLogTable onEdit={setSelectedWorkLog} />

      {/* Диалог создания новой записи */}
      <CreateWorkLogDialog 
        open={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />

      {/* Диалог редактирования записи */}
      <EditWorkLogDialog 
        open={Boolean(selectedWorkLog)} // Если строка выбрана (не null) — открываем модалку
        worklog={selectedWorkLog} 
        onClose={() => setSelectedWorkLog(null)} // Сброс в null закроет диалог
      />
    </Container>
  );
};

export default WorkLogPage;
