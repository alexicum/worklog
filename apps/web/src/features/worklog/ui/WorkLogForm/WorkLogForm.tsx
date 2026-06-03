import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Grid, CircularProgress, Alert } from '@mui/material';
import type { WorkLog, CreateWorkLog, UpdateWorkLog } from '@repo/schemas';
import { getApiErrorMessage } from '@/shared/api';

interface WorkLogFormProps {
  initialValues?: WorkLog | UpdateWorkLog | null;
  onSubmit: (data: CreateWorkLog) => Promise<void>;
  isLoading: boolean;
  submitButtonText?: string;
}

export const WorkLogForm = ({ 
  initialValues, 
  onSubmit, 
  isLoading, 
  submitButtonText = 'Сохранить' 
}: WorkLogFormProps) => {
  // Инициализируем стейт один раз при монтировании.
  const [formData, setFormData] = useState({
    workerName: initialValues?.workerName ?? '',
    workerTypeName: initialValues?.workerTypeName ?? '',
    workTypeName: initialValues?.workTypeName ?? '',
    volume: initialValues?.volume ?? 0,
    workTypeUnit: initialValues?.workTypeUnit ?? '',
    doneAt: initialValues?.doneAt ? initialValues.doneAt.split('T')[0] : '',
  });
  
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const newErrors: Record<string, boolean> = {};
    const requiredFields: (keyof typeof formData)[] = [
      'workerName',
      'workerTypeName',
      'workTypeName',
      'workTypeUnit',
      'doneAt',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    if (formData.volume <= 0) {
      newErrors.volume = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload: CreateWorkLog = {
        ...formData,
        doneAt: new Date(formData.doneAt).toISOString(),
      };

      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      const errorMessage = getApiErrorMessage(err);
      setSubmitError(errorMessage);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
      {submitError && <Alert severity="error" sx={{ mb: 3 }}>{submitError}</Alert>}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            name="workerName"
            label="ФИО сотрудника"
            fullWidth
            value={formData.workerName}
            onChange={handleChange}
            error={errors.workerName}
            helperText={errors.workerName && 'Поле обязательно'}
            disabled={isLoading}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            name="workerTypeName"
            label="Должность"
            fullWidth
            value={formData.workerTypeName}
            onChange={handleChange}
            error={errors.workerTypeName}
            helperText={errors.workerTypeName && 'Поле обязательно'}
            disabled={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            name="workTypeName"
            label="Описание вида работы"
            fullWidth
            value={formData.workTypeName}
            onChange={handleChange}
            error={errors.workTypeName}
            helperText={errors.workTypeName && 'Поле обязательно'}
            disabled={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="volume"
            label="Объем работ"
            type="number"
            fullWidth
            value={formData.volume || ''}
            onChange={handleChange}
            error={errors.volume}
            helperText={errors.volume && 'Должен быть больше нуля'}
            disabled={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="workTypeUnit"
            label="Единица измерения"
            fullWidth
            value={formData.workTypeUnit}
            onChange={handleChange}
            error={errors.workTypeUnit}
            helperText={errors.workTypeUnit && 'Обязательно'}
            disabled={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="doneAt"
            label="Дата выполнения"
            type="date"
            fullWidth
            value={formData.doneAt}
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true } }}
            error={errors.doneAt}
            helperText={errors.doneAt && 'Укажите дату'}
            disabled={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ minWidth: 150, height: 42 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : submitButtonText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
