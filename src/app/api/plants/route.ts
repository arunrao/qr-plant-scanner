// src/app/api/plants/route.ts
import { NextResponse } from 'next/server';
import { plantData } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const grid = searchParams.get('grid');

  if (id) {
    const plant = plantData.find(p => p.id === id);
    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }
    return NextResponse.json(plant);
  }

  if (grid) {
    const plant = plantData.find(p => p.grid.toLowerCase() === grid.toLowerCase());
    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }
    return NextResponse.json(plant);
  }

  return NextResponse.json({ error: 'Missing id or grid parameter' }, { status: 400 });
}
