import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
export function LoadingState() {
  return (
    <Paper sx={{ p: 6, textAlign: 'center' }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }} color="text.secondary">
        Загружаем данные…
      </Typography>
    </Paper>
  );
}
export function ErrorState() {
  return <Alert severity="error">Не удалось загрузить данные. Попробуйте обновить страницу.</Alert>;
}
export function EmptyState() {
  return (
    <Box sx={{ p: 6, textAlign: 'center' }}>
      <Typography color="text.secondary">Ничего не найдено</Typography>
    </Box>
  );
}
