import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '../../database/crud';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';

  const data = await findUserByEmail(email);

  if (data && data.length > 0) {
    return NextResponse.json(
      { email: data[0].email, name: data[0].name },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { email: '', name: '' },
    { status: 404 }
  );
}
