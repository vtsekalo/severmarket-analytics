import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/shared/mock/data';
export async function GET(req: NextRequest) {
  const search = (req.nextUrl.searchParams.get('search') ?? '').toLowerCase();
  const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
  const pageSize = 12;
  const data = products.filter((p) => p.name.toLowerCase().includes(search));
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
