export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (key !== 'seed2026namensreue') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch seed data from public folder via HTTP
    const baseUrl = process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
    const res = await fetch(`${baseUrl}/seed-data.json`);
    if (!res.ok) {
      return NextResponse.json({ error: 'seed-data.json not found' }, { status: 500 });
    }
    const names: any[] = await res.json();

    let created = 0;
    let skipped = 0;

    for (const n of names) {
      try {
        await prisma.name.upsert({
          where: { name: n.name },
          update: {
            origin: n.origin,
            meaningDe: n.meaningDe,
            meaningEn: n.meaningEn,
            meaningEs: n.meaningEs,
            gender: n.gender,
            region: n.region,
            bullyingScore: n.bullyingScore,
            intlScore: n.intlScore,
            careerScore: n.careerScore,
            trendScore: n.trendScore,
            overallRegret: n.overallRegret,
            explanationDe: n.explanationDe,
            explanationEn: n.explanationEn,
            explanationEs: n.explanationEs,
            popularity: n.popularity,
            yearPeak: n.yearPeak,
          },
          create: {
            name: n.name,
            origin: n.origin,
            meaningDe: n.meaningDe,
            meaningEn: n.meaningEn,
            meaningEs: n.meaningEs,
            gender: n.gender,
            region: n.region,
            bullyingScore: n.bullyingScore,
            intlScore: n.intlScore,
            careerScore: n.careerScore,
            trendScore: n.trendScore,
            overallRegret: n.overallRegret,
            explanationDe: n.explanationDe,
            explanationEn: n.explanationEn,
            explanationEs: n.explanationEs,
            popularity: n.popularity,
            yearPeak: n.yearPeak,
          },
        });
        created++;
      } catch (e) {
        skipped++;
      }
    }

    return NextResponse.json({ success: true, total: names.length, created, skipped });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
