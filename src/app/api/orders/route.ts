import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/shared/mock/data';
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const search = (q.get('search') ?? '').toLowerCase();
  const status = q.get('status');
  const city = q.get('city');
  const page = Number(q.get('page') ?? 1);
  const pageSize = 12;
  let data = orders.filter(
    (o) =>
      (!search ||
        o.id.toLowerCase().includes(search) ||
        o.customer.toLowerCase().includes(search)) &&
      (!status || o.status === status) &&
      (!city || o.city === city),
  );
  data = [...data].sort((a, b) =>
    q.get('sort') === 'amount' ? b.amount - a.amount : b.date.localeCompare(a.date),
  );
  return NextResponse.json({
    data: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
  });
}
export async function POST(req: NextRequest) {
  return NextResponse.json(await req.json(), { status: 201 });
}
