// Run with: node public/seed-runner.js
const fs = require('fs');
const path = require('path');

async function main() {
  // Dynamic import for @prisma/client
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  try {
    const dataPath = path.join(__dirname, 'seed-data.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const names = JSON.parse(raw);
    console.log(`Found ${names.length} names to seed...`);

    let created = 0;
    let errors = 0;

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
        if (created % 50 === 0) console.log(`  ... ${created} names processed`);
      } catch (e) {
        errors++;
        console.error(`Error with ${n.name}: ${e.message}`);
      }
    }

    console.log(`\nDone! Created/updated: ${created}, Errors: ${errors}`);
    const total = await prisma.name.count();
    console.log(`Total names in database: ${total}`);
  } catch (err) {
    console.error('Fatal error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
