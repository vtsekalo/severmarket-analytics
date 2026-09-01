import { NextResponse } from 'next/server';
import { analytics, products } from '@/shared/mock/data';
export async function GET() {
  const categories = Object.entries(
    products.reduce<Record<string, number>>(
      (a, p) => ({ ...a, [p.category]: (a[p.category] ?? 0) + p.revenue }),
      {},
    ),
  ).map(([name, value]) => ({ name, value }));
  return NextResponse.json({ series: analytics, categories });
}
