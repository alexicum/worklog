import { Container, Typography, Box } from '@mui/material';
import { WorkLogTable } from '@/features/worklog';

const WorkLogPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Журнал работ
        </Typography>
      </Box>
      <WorkLogTable />
    </Container>
  );
};

export default WorkLogPage;
