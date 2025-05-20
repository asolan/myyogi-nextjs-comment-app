import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listQuotes() {
	const data = await sql`
    SELECT quotes.amount, customers.name
    FROM quotes
    JOIN customers ON quotes.customerID = customers.id
    WHERE quotes.amount != 666;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listQuotes());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
