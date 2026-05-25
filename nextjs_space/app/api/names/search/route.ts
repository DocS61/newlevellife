export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request?.url ?? 'http://localhost:3000')
    const q = url?.searchParams?.get('q') ?? ''
    const exact = url?.searchParams?.get('exact') === 'true'
    const limit = parseInt(url?.searchParams?.get('limit') ?? '10', 10)

    if (!q) {
      return NextResponse.json({ names: [] })
    }

    let names
    if (exact) {
      // Exact match (case-insensitive via lowered comparison)
      names = await prisma.name.findMany({
        where: {
          name: {
            equals: q.charAt(0).toUpperCase() + q.slice(1).toLowerCase(),
          },
        },
        take: 1,
      })
      // Fallback: try original casing
      if ((names?.length ?? 0) === 0) {
        names = await prisma.name.findMany({
          where: {
            name: {
              equals: q,
            },
          },
          take: 1,
        })
      }
    } else {
      // Prefix search
      const prefix = q.charAt(0).toUpperCase() + q.slice(1).toLowerCase()
      names = await prisma.name.findMany({
        where: {
          name: {
            startsWith: prefix,
          },
        },
        orderBy: { popularity: 'desc' },
        take: limit,
      })
    }

    return NextResponse.json({ names: names ?? [] })
  } catch (err: any) {
    console.error('Search error:', err)
    return NextResponse.json({ names: [], error: 'Search failed' }, { status: 500 })
  }
}
