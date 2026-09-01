import { NextRequest, NextResponse } from 'next/server';
import { customers } from '@/shared/mock/data';
export async function GET(req: NextRequest) {
  const search = (req.nextUrl.searchParams.get('search') ?? '').toLowerCase();
  const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
  const pageSize = 12;
  const data = customers.filter(
    (c) => c.name.toLowerCase().includes(search) || c.city.toLowerCase().includes(search),
  );
  return NextResponse.json({
    data: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
  });
}
