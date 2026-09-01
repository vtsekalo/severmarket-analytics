import { NextResponse } from 'next/server';
import { regions } from '@/shared/mock/data';
export async function GET() {
  return NextResponse.json(regions);
}
