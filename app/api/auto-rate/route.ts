import { NextResponse } from 'next/server';

// FRED series: Finance Rate on Consumer Installment Loans at Commercial Banks
// New Autos, 60-Month Loan — updated monthly by the Federal Reserve
// https://fred.stlouisfed.org/series/RIFLPBCIANM60NM
const FRED_SERIES = 'RIFLPBCIANM60NM';

export async function GET() {
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'FRED_API_KEY not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch the 5 most recent observations — FRED sometimes returns "." for
    // the latest period before it's published, so we scan for the first real value.
    const res = await fetch(
      `https://api.stlouisfed.org/fred/series/observations` +
        `?series_id=${FRED_SERIES}` +
        `&api_key=${apiKey}` +
        `&file_type=json` +
        `&sort_order=desc` +
        `&limit=5`,
      { next: { revalidate: 86400 } } // cache 24 hours — rate only updates monthly
    );

    if (!res.ok) throw new Error(`FRED responded ${res.status}`);

    const data = await res.json();
    const observations: Array<{ date: string; value: string }> =
      data.observations ?? [];

    // Find the most recent observation with an actual value
    const latest = observations.find((o) => o.value !== '.');

    if (!latest) throw new Error('No recent value available');

    return NextResponse.json({
      rate: parseFloat(latest.value),
      date: latest.date,
      series: FRED_SERIES,
      label: 'Avg 60-mo new car loan rate',
      source: 'Federal Reserve via FRED',
      sourceUrl: `https://fred.stlouisfed.org/series/${FRED_SERIES}`,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
