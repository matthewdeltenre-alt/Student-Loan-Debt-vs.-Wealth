import { NextResponse } from 'next/server';

// Revalidate this route every 24 hours — FRED data updates monthly
export const revalidate = 86400;

// FRED series: Finance Rate on Consumer Installment Loans at Commercial Banks
// New Autos, 60-Month Loan — updated monthly by the Federal Reserve
// https://fred.stlouisfed.org/series/RIFLPBCIANM60NM
const FRED_SERIES = 'RIFLPBCIANM60NM';

export async function GET() {
  const apiKey = process.env.FRED_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: 'FRED_API_KEY not configured' },
      { status: 500 }
    );
  }

  // FRED API keys are exactly 32 alphanumeric characters
  if (apiKey.length !== 32) {
    return NextResponse.json(
      { error: `API key looks wrong — expected 32 chars, got ${apiKey.length}` },
      { status: 500 }
    );
  }

  const url =
    `https://api.stlouisfed.org/fred/series/observations` +
    `?series_id=${FRED_SERIES}` +
    `&api_key=${apiKey}` +
    `&file_type=json` +
    `&sort_order=desc` +
    `&limit=5`;

  try {
    // No fetch-level cache — let Next.js route revalidation handle caching
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return NextResponse.json(
        { error: `FRED responded ${res.status}`, detail: body.slice(0, 300) },
        { status: 502 }
      );
    }

    const data = await res.json();
    const observations: Array<{ date: string; value: string }> =
      data.observations ?? [];

    // FRED sometimes returns "." for the latest period before it's published
    const latest = observations.find((o) => o.value !== '.');

    if (!latest) {
      return NextResponse.json(
        { error: 'No recent value available', observations },
        { status: 502 }
      );
    }

    return NextResponse.json({
      rate: parseFloat(latest.value),
      date: latest.date,
      series: FRED_SERIES,
      label: 'Avg 60-mo new car loan rate',
      source: 'Federal Reserve via FRED',
      sourceUrl: `https://fred.stlouisfed.org/series/${FRED_SERIES}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: String(err), url: url.replace(apiKey, '***') },
      { status: 502 }
    );
  }
}
