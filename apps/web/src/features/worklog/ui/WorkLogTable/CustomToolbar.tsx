import { Badge, Tooltip, Typography } from '@mui/material';
import { Toolbar, ToolbarButton, FilterPanelTrigger, GridFilterListIcon } from '@mui/x-data-grid';

export const CustomToolbar = () => {
  return (
    <Toolbar style={{ padding: '8px', gap: '8px' }}>
      <Typography sx={{ fontWeight: 'medium', flex: 1, mx: 0.5 }}>
        Список задач
      </Typography>        
      <Tooltip title="Filters">
        <FilterPanelTrigger
        aria-label="Открыть панель фильтров"
        render={(props, state) => (
            <ToolbarButton {...props} color="default">
            <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                <GridFilterListIcon fontSize="small" />
            </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>      
    </Toolbar>
  );
};