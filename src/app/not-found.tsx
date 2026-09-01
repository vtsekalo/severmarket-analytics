'use client';

import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
export default function NotFound() {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 12 }}>
      <Typography variant="h1">404</Typography>
      <Typography>Страница не найдена</Typography>
      <Button component={Link} href="/dashboard" variant="contained">
        Вернуться в обзор
      </Button>
    </Stack>
  );
}
