import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/shared/mock/data';
export async function GET(_r: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  return order
    ? NextResponse.json(order)
    : NextResponse.json({ message: 'Заказ не найден' }, { status: 404 });
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  return order
    ? NextResponse.json({ ...order, ...(await req.json()) })
    : NextResponse.json({ message: 'Заказ не найден' }, { status: 404 });
}
export async function DELETE(_r: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ id });
}
