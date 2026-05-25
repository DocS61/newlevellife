export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const count = await prisma.name.count()
    if (count === 0) {
      return NextResponse.json({ name: null })
    }
    const skip = Math.floor(Math.random() * count)
    const names = await prisma.name.findMany({
      skip,
      take: 1,
    })
    return NextResponse.json({ name: names?.[0] ?? null })
  } catch (err: any) {
    console.error('Random name error:', err)
    return NextResponse.json({ name: null, error: 'Failed to get random name' }, { status: 500 })
  }
}
