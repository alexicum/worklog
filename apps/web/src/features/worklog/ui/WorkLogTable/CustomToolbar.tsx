import { Toolbar, ToolbarButton, FilterPanelTrigger } from '@mui/x-data-grid';

export const CustomToolbar = () => {
  return (
    <Toolbar style={{ padding: '8px', gap: '8px' }}>
      <FilterPanelTrigger 
        aria-label="Открыть панель фильтров" 
        render={<ToolbarButton />}
      >
        Фильтры
      </FilterPanelTrigger>
    </Toolbar>
  );
};