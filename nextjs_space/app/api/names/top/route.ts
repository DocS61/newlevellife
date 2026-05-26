export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [safest, riskiest] = await Promise.all([
      prisma.name.findMany({
        orderBy: { overallRegret: 'asc' },
        take: 10,
      }),
      prisma.name.findMany({
        orderBy: { overallRegret: 'desc' },
        take: 10,
      }),
    ])
    return NextResponse.json({ safest: safest ?? [], riskiest: riskiest ?? [] })
  } catch (err: any) {
    console.error('Top names error:', err)
    return NextResponse.json({ safest: [], riskiest: [], error: 'Failed' }, { status: 500 })
  }
}
