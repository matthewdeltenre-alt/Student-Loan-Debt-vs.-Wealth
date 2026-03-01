import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const fields = [
    'id',
    'school.name',
    'school.city',
    'school.state',
    'latest.cost.attendance.academic_year',
    'latest.cost.tuition.in_state',
    'latest.cost.tuition.out_of_state',
    'latest.aid.median_debt.completers.overall',
    'latest.student.size',
    'school.school_url',
  ].join(',');

  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(query)}&_fields=${fields}&_per_page=8&_sort=latest.student.size:desc`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Scorecard API error: ${res.status}`);
    const data = await res.json();

    const results = (data.results || []).map((r: Record<string, unknown>) => ({
      id: r['id'],
      name: r['school.name'],
      city: r['school.city'],
      state: r['school.state'],
      costOfAttendance: r['latest.cost.attendance.academic_year'],
      tuitionInState: r['latest.cost.tuition.in_state'],
      tuitionOutOfState: r['latest.cost.tuition.out_of_state'],
      medianDebt: r['latest.aid.median_debt.completers.overall'],
    }));

    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch college data' }, { status: 500 });
  }
}
