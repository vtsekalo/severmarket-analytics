import { NextResponse } from 'next/server';
import { dashboard } from '@/shared/mock/data';
export async function GET() {
  return NextResponse.json(dashboard);
}
