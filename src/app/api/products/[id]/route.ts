import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/shared/mock/data';
export async function GET(_r: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  return p
    ? NextResponse.json(p)
    : NextResponse.json({ message: 'Товар не найден' }, { status: 404 });
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  return p
    ? NextResponse.json({ ...p, ...(await req.json()) })
    : NextResponse.json({ message: 'Товар не найден' }, { status: 404 });
}
