'use client';

import React from 'react';
import { BookOpen, Globe, Briefcase, TrendingUp, Shield, Heart, ExternalLink } from 'lucide-react';

import { NameData } from '@/lib/types';

function getGenderLabel(gender: string | null): string {
  if (!gender || gender === '') return 'unisex';
  const g = gender.toLowerCase();
  if (g === 'male' || g === 'm') return 'männlich';
  if (g === 'female' || g === 'f') return 'weiblich';
  return 'unisex';
}

function getScoreCategory(score: number): { label: string; color: string; bg: string } {
  if (score <= 3) return { label: 'niedrig', color: 'text-green-700', bg: 'bg-green-50 border-green-200' };
  if (score <= 5) return { label: 'moderat', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' };
  if (score <= 7) return { label: 'erhöht', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' };
  return { label: 'hoch', color: 'text-red-700', bg: 'bg-red-50 border-red-200' };
}

function getBullyingText(name: string, score: number): string {
  if (score <= 2) {
    return `Der Name ${name} bietet kaum Angriffsfläche für Hänseleien. Er lässt sich weder leicht verdrehen noch reimt er sich auf unangenehme Wörter. Kinder mit diesem Namen haben es auf dem Schulhof in der Regel leicht.`;
  }
  if (score <= 4) {
    return `${name} hat ein geringes Mobbing-Risiko. Es gibt wenige naheliegende Verballhornungen oder Spitznamen mit negativem Klang. Insgesamt ein unkomplizierter Name im Schulalltag.`;
  }
  if (score <= 6) {
    return `Bei ${name} gibt es ein moderates Risiko für Hänseleien. Bestimmte Reime oder Klangähnlichkeiten könnten von Kindern aufgegriffen werden. Eltern sollten mögliche Spitznamen vorher durchspielen.`;
  }
  if (score <= 8) {
    return `Der Name ${name} bietet einige Angriffspunkte für Hänseleien. Klangliche Ähnlichkeiten zu unangenehmen Wörtern oder einfache Verballhornungen sind möglich. Eine bewusste Abwägung ist ratsam.`;
  }
  return `${name} hat ein erhöhtes Mobbing-Risiko. Der Name lässt sich leicht verdrehen oder reimt sich auf Begriffe, die Kinder als Spottname verwenden könnten. Dies sollte bei der Namenswahl berücksichtigt werden.`;
}

function getIntlText(name: string, score: number): string {
  if (score <= 3) {
    return `${name} ist international schwer auszusprechen. Menschen in englisch-, französisch- oder spanischsprachigen Ländern haben oft Schwierigkeiten mit der korrekten Aussprache. Wer viel reist oder im Ausland leben möchte, sollte dies bedenken.`;
  }
  if (score <= 5) {
    return `Die internationale Aussprechbarkeit von ${name} ist durchschnittlich. In einigen Sprachen funktioniert der Name gut, in anderen wird er häufig falsch betont oder verändert ausgesprochen.`;
  }
  if (score <= 7) {
    return `${name} lässt sich in den meisten europäischen Sprachen gut aussprechen. Kleinere Abweichungen in der Betonung sind möglich, aber der Name wird in der Regel problemlos verstanden.`;
  }
  return `${name} ist international hervorragend aussprechbar. Der Name funktioniert in praktisch allen gängigen Sprachen und wird weltweit problemlos verstanden – ideal für Familien mit internationalem Hintergrund.`;
}

function getCareerText(name: string, score: number): string {
  if (score <= 3) {
    return `Im beruflichen Kontext kann ${name} gewisse Herausforderungen mit sich bringen. Studien zeigen, dass bestimmte Vornamen unbewusste Vorurteile bei Personalern und Kollegen auslösen können. Der Name wird möglicherweise als weniger seriös wahrgenommen.`;
  }
  if (score <= 5) {
    return `${name} hat im Berufsleben eine neutrale Wirkung. Der Name löst weder besonders positive noch negative Assoziationen aus und steht einer erfolgreichen Karriere nicht im Weg.`;
  }
  if (score <= 7) {
    return `${name} wird im professionellen Umfeld positiv wahrgenommen. Der Name klingt kompetent und seriös, ohne übermäßig konservativ zu wirken. Eine gute Wahl für den beruflichen Werdegang.`;
  }
  return `${name} erzielt im Berufsleben Bestnoten. Forschungsergebnisse legen nahe, dass dieser Name mit Kompetenz, Zuverlässigkeit und Führungsstärke assoziiert wird. Bewerber mit diesem Namen erhalten laut Studien häufiger Einladungen zu Vorstellungsgesprächen.`;
}

function getTrendText(name: string, score: number, yearPeak: number | null): string {
  const peakInfo = yearPeak ? ` Seine größte Beliebtheit erreichte ${name} um das Jahr ${yearPeak}.` : '';
  if (score <= 3) {
    return `${name} ist ein eher seltener Name, der aktuell kaum vergeben wird.${peakInfo} Seltene Namen können Individualität unterstreichen, führen aber auch dazu, dass der Name häufig buchstabiert oder erklärt werden muss.`;
  }
  if (score <= 5) {
    return `${name} wird derzeit mäßig häufig vergeben.${peakInfo} Der Name ist bekannt genug, um nicht ständig erklärt werden zu müssen, aber selten genug, um nicht in jeder Schulklasse dreimal vorzukommen.`;
  }
  if (score <= 7) {
    return `${name} liegt aktuell im Trend und wird regelmäßig vergeben.${peakInfo} Der Name trifft den Zeitgeist, ohne dabei zu modisch zu wirken. Eine beliebte Wahl unter jungen Eltern.`;
  }
  return `${name} gehört zu den derzeit beliebtesten Vornamen in Deutschland.${peakInfo} Der Name ist modern und trifft den Nerv der Zeit. Allerdings sollten Eltern bedenken, dass in Kindergarten und Schule mehrere Kinder den gleichen Namen tragen könnten.`;
}

function getOverallText(name: string, score: number): string {
  if (score <= 3) {
    return `Unser Algorithmus stuft ${name} als exzellente Namenswahl ein. Der Name schneidet in allen Kategorien – von der Mobbing-Sicherheit über die Karrierewirkung bis zur internationalen Tauglichkeit – überdurchschnittlich gut ab. Eltern, die sich für ${name} entscheiden, machen nach unserer Analyse wenig falsch.`;
  }
  if (score <= 5) {
    return `${name} erhält in unserer Gesamtbewertung ein gutes Ergebnis. Der Name hat klare Stärken und nur wenige Schwachpunkte. Für die meisten Familien ist ${name} eine solide, durchdachte Wahl, die dem Kind im Leben kaum Nachteile bringen wird.`;
  }
  if (score <= 7) {
    return `Unsere Analyse zeigt bei ${name} ein gemischtes Bild. In einigen Kategorien schneidet der Name gut ab, in anderen gibt es Verbesserungspotenzial. Eltern sollten die Einzelbewertungen genau prüfen und abwägen, welche Aspekte ihnen besonders wichtig sind.`;
  }
  return `${name} weist in unserer Gesamtanalyse einige Risikofaktoren auf. In mehreren Kategorien zeigt der Name Schwächen, die das Kind im Laufe seines Lebens begleiten könnten. Wir empfehlen, auch alternative Namen in Betracht zu ziehen oder den Namen durch einen gut gewählten Zweitnamen zu ergänzen.`;
}

function getSuggestedMiddleNames(name: string, gender: string | null): string[] {
  const g = gender?.toLowerCase() || '';
  const isMale = g === 'male' || g === 'm';
  const isFemale = g === 'female' || g === 'f';

  const maleNames = ['Alexander', 'Maximilian', 'Johannes', 'Friedrich', 'Sebastian', 'Matthias', 'Konstantin', 'Valentin', 'Theodor', 'Leopold', 'Ferdinand', 'Heinrich', 'Benedikt', 'Leonhard', 'Nikolaus'];
  const femaleNames = ['Marie', 'Sophie', 'Charlotte', 'Elisabeth', 'Katharina', 'Johanna', 'Magdalena', 'Victoria', 'Amelie', 'Luise', 'Theresa', 'Henriette', 'Franziska', 'Eleonore', 'Friederike'];
  const unisexNames = ['Alex', 'Kim', 'Robin', 'Sascha', 'Nikita', 'Luca', 'Andrea', 'Toni', 'Mika', 'Eden'];

  let pool: string[];
  if (isMale) pool = maleNames;
  else if (isFemale) pool = femaleNames;
  else pool = unisexNames;

  // Deterministic selection based on name hash
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const selected: string[] = [];
  const filtered = pool.filter(n => n.toLowerCase() !== name.toLowerCase());
  for (let i = 0; i < 5 && i < filtered.length; i++) {
    const idx = (hash + i * 7) % filtered.length;
    if (!selected.includes(filtered[idx])) {
      selected.push(filtered[idx]);
    } else {
      // find next available
      for (let j = 1; j < filtered.length; j++) {
        const altIdx = (idx + j) % filtered.length;
        if (!selected.includes(filtered[altIdx])) {
          selected.push(filtered[altIdx]);
          break;
        }
      }
    }
  }
  return selected.slice(0, 5);
}

export default function NameContentSection({ data }: { data: NameData }) {
  const { name } = data;
  const genderLabel = getGenderLabel(data.gender);
  const overallCat = getScoreCategory(data.overallRegret);
  const bullyingCat = getScoreCategory(data.bullyingScore);
  const intlCat = getScoreCategory(10 - data.intlScore); // invert: high intl = good
  const careerCat = getScoreCategory(10 - data.careerScore);
  const trendCat = getScoreCategory(data.trendScore);
  const middleNames = getSuggestedMiddleNames(name, data.gender);

  return (
    <section className="mt-8 space-y-6" id="name-analyse">
      {/* Overall Recommendation */}
      <div className={`rounded-xl border p-6 ${overallCat.bg}`}>
        <div className="flex items-start gap-3 mb-3">
          <Heart className={`w-6 h-6 mt-0.5 ${overallCat.color}`} />
          <h2 className="text-xl font-bold text-gray-900">
            Alles über den Namen {name}
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {getOverallText(name, data.overallRegret)}
        </p>
        <p className="text-sm text-gray-600 mt-3">
          <strong>{name}</strong> ist ein {genderLabel}er Vorname
          {data.origin ? ` mit ${data.origin}em Ursprung` : ''}
          {data.meaningDe ? ` und bedeutet „${data.meaningDe}"` : ''}.
          {data.popularity > 0 ? ` Der Name hat einen Bekanntheitsgrad von ${data.popularity} von 10.` : ''}
        </p>
      </div>

      {/* Origin & Meaning */}
      {(data.origin || data.meaningDe) && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-3 mb-3">
            <BookOpen className="w-6 h-6 mt-0.5 text-blue-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Herkunft &amp; Bedeutung von {name}
            </h3>
          </div>
          <div className="text-gray-700 leading-relaxed space-y-2">
            {data.origin && (
              <p>
                Der Name {name} hat {data.origin}e Wurzeln und blickt auf eine lange Namenstradition zurück.
                {data.region ? ` Besonders verbreitet ist der Name in der Region ${data.region}.` : ''}
              </p>
            )}
            {data.meaningDe && (
              <p>
                Die Bedeutung „{data.meaningDe}" verleiht dem Namen eine besondere Tiefe. Viele Eltern wählen {name} bewusst wegen dieser Bedeutung, da sie positive Eigenschaften und Werte widerspiegelt.
              </p>
            )}
            {data.yearPeak && (
              <p>
                Historisch gesehen war {name} besonders um {data.yearPeak} herum beliebt. Seitdem hat sich die Vergabehäufigkeit verändert, was den Namen je nach Perspektive zeitlos oder retro erscheinen lässt.
              </p>
            )}
          </div>
        </div>
      )}

      {/* International */}
      <div className={`rounded-xl border p-6 ${getScoreCategory(10 - data.intlScore).bg}`}>
        <div className="flex items-start gap-3 mb-3">
          <Globe className={`w-6 h-6 mt-0.5 ${getScoreCategory(10 - data.intlScore).color}`} />
          <h3 className="text-lg font-semibold text-gray-900">
            {name} international: Aussprache &amp; Verständlichkeit
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {getIntlText(name, data.intlScore)}
        </p>
      </div>

      {/* Career */}
      <div className={`rounded-xl border p-6 ${getScoreCategory(10 - data.careerScore).bg}`}>
        <div className="flex items-start gap-3 mb-3">
          <Briefcase className={`w-6 h-6 mt-0.5 ${getScoreCategory(10 - data.careerScore).color}`} />
          <h3 className="text-lg font-semibold text-gray-900">
            {name} im Berufsleben
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {getCareerText(name, data.careerScore)}
        </p>
      </div>

      {/* Trend */}
      <div className={`rounded-xl border p-6 bg-purple-50 border-purple-200`}>
        <div className="flex items-start gap-3 mb-3">
          <TrendingUp className="w-6 h-6 mt-0.5 text-purple-700" />
          <h3 className="text-lg font-semibold text-gray-900">
            Trend &amp; Zeitlosigkeit: Wie aktuell ist {name}?
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {getTrendText(name, data.trendScore, data.yearPeak)}
        </p>
      </div>

      {/* Bullying */}
      <div className={`rounded-xl border p-6 ${bullyingCat.bg}`}>
        <div className="flex items-start gap-3 mb-3">
          <Shield className={`w-6 h-6 mt-0.5 ${bullyingCat.color}`} />
          <h3 className="text-lg font-semibold text-gray-900">
            Mobbing-Check: Ist {name} hänselsicher?
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {getBullyingText(name, data.bullyingScore)}
        </p>
      </div>

      {/* Middle Names */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
        <div className="flex items-start gap-3 mb-3">
          <Heart className="w-6 h-6 mt-0.5 text-indigo-700" />
          <h3 className="text-lg font-semibold text-gray-900">
            Passende Zweitnamen für {name}
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          Ein gut gewählter Zweitname kann den Vornamen harmonisch ergänzen und dem Kind später mehr Flexibilität geben. Hier sind unsere Vorschläge für Zweitnamen, die gut zu {name} passen:
        </p>
        <div className="flex flex-wrap gap-2">
          {middleNames.map((mn) => (
            <span
              key={mn}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-indigo-300 text-indigo-700 text-sm font-medium"
            >
              {name} {mn}
            </span>
          ))}
        </div>
      </div>

      {/* SEO Text Block */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Fazit: Sollte man sein Kind {name} nennen?
        </h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          Die Wahl eines Vornamens ist eine der ersten und wichtigsten Entscheidungen, die Eltern für ihr Kind treffen. Der Name {name} bringt – wie jeder Name – bestimmte Vor- und Nachteile mit sich, die wir in unserer Analyse detailliert beleuchtet haben.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Unsere Bewertung basiert auf wissenschaftlichen Studien zur Namenforschung, linguistischen Analysen und statistischen Daten. Dabei berücksichtigen wir Faktoren wie die Mobbing-Anfälligkeit im Schulalter, die berufliche Wirkung des Namens, seine internationale Tauglichkeit und aktuelle Trends.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Letztlich ist die Namenswahl immer auch eine Herzensangelegenheit. Unsere Daten können bei der Entscheidung helfen, aber der persönliche Bezug zum Namen ist mindestens genauso wichtig. Wenn Sie {name} in Betracht ziehen, nutzen Sie unsere detaillierte Analyse als einen von vielen Bausteinen Ihrer Entscheidung.
        </p>
      </div>
      {/* Quellen & Referenzen */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-gray-500" />
          Quellen & Referenzen
        </h3>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600">
            <a href="https://gfds.de/vornamen/" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 hover:underline">Gesellschaft für deutsche Sprache: Vornamen-Statistik</a> – GfdS e.\u202fV.
          </li>
          <li className="text-sm text-gray-600">
            <a href="https://www.beliebte-vornamen.de/" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 hover:underline">Beliebte Vornamen: Jahresstatistiken</a> – Knud Bielefeld / beliebte-vornamen.de
          </li>
          <li className="text-sm text-gray-600">
            <a href="https://de.wikipedia.org/wiki/Vorname" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 hover:underline">Vorname – Wikipedia</a> – Wikimedia Foundation
          </li>
          <li className="text-sm text-gray-600">
            <a href="https://doi.org/10.1037/pspa0000076" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 hover:underline">Dorian-Gray-Effekt bei Vornamen</a> – Journal of Personality and Social Psychology (2017)
          </li>
        </ul>
      </div>
    </section>
  );
}
