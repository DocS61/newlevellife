export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const names = await prisma.name.findMany({
      orderBy: { popularity: 'desc' },
      take: 12,
    })
    return NextResponse.json({ names: names ?? [] })
  } catch (err: any) {
    console.error('Popular names error:', err)
    return NextResponse.json({ names: [], error: 'Failed to fetch popular names' }, { status: 500 })
  }
}
