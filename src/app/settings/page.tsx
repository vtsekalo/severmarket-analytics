'use client';
import { Card, CardContent, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import { useState } from 'react';
export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  return (
    <Card sx={{ maxWidth: 680 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          Профиль и настройки
        </Typography>
        <Stack spacing={2}>
          <TextField label="Имя" defaultValue="Анна Северова" />
          <TextField label="Email" defaultValue="anna@severmarket.example" type="email" />
          <TextField label="Роль" defaultValue="Аналитик" disabled />
          <Button variant="contained" onClick={() => setSaved(true)}>
            Сохранить изменения
          </Button>
          {saved && <Alert severity="success">Настройки сохранены</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
}
