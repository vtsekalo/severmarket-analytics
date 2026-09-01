import { NextRequest, NextResponse } from 'next/server';
import { customers } from '@/shared/mock/data';
export async function GET(_r: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = customers.find((x) => x.id === id);
  return c
    ? NextResponse.json(c)
    : NextResponse.json({ message: 'Клиент не найден' }, { status: 404 });
}
