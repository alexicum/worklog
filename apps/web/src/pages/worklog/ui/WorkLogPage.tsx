import { Container, Typography, Box } from '@mui/material';
import { WorkLogTable } from '@/features/worklog';

const WorkLogPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Журнал работ
        </Typography>
      </Box>
      <WorkLogTable />
    </Container>
  );
};

export default WorkLogPage;
