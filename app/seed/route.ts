import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, customers, quotes, notes, votes } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuID-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS person (
      ID UUID DEFAULT uuID_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (person) => {
      const hashedPassword = await bcrypt.hash(person.password, 10);
      return sql`
        INSERT INTO users (ID, name, email, password)
        VALUES (${person.ID}, ${person.name}, ${person.email}, ${hashedPassword})
        ON CONFLICT (ID) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuID-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      ID UUID DEFAULT uuID_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (ID, name, email, image_url)
        VALUES (${customer.ID}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (ID) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

/*************************************/
async function seedQuotes() {
  await sql`
    CREATE TABLE IF NOT EXISTS quote (
      ID SERIAL PRIMARY KEY,
      customerID INT REFERENCES customers(ID),
      chapterNum INT,
      paragraphNum INT,
      posStart INT,
      posEnd INT,
      created DATE DEFAULT CURRENT_DATE,
      isActive BIT
    );
  `;

  const insertedQuotes = await Promise.all(
    quotes.map(
      (quote) => sql`
        INSERT INTO quote (customerID, chapterNum, paragraphNum, posStart, posEnd, created, isActive)
        VALUES (${quote.customerID}, ${quote.chapterNum}, ${quote.paragraphNum}, ${quote.posStart}, ${quote.posEnd}, ${quote.created}, ${quote.isActive})
        ON CONFLICT (ID) DO NOTHING;
      `,
    ),
  );

  return insertedQuotes;
}

async function seedNotes() {
  await sql`
    CREATE TABLE IF NOT EXISTS note (
      ID SERIAL PRIMARY KEY,
      customerID INT REFERENCES customers(ID),
      quoteID INT REFERENCES quote(ID),
      title VARCHAR(255) NOT NULL,
      details TEXT,
      created DATE DEFAULT CURRENT_DATE,
      updated DATE DEFAULT CURRENT_DATE,
      isActive BIT
    );
  `;

  const insertedNotes = await Promise.all(
    notes.map(
      (note) => sql`
        INSERT INTO note (customerID, quoteID, title, details, created, updated, isActive)
        VALUES (${note.customerID}, ${note.quoteID}, ${note.title}, ${note.details}, ${note.created}, ${note.updated}, ${note.isActive})
        ON CONFLICT (ID) DO NOTHING;
      `,
    ),
  );

  return insertedNotes;
}

async function seedVotes() {
  await sql`
    CREATE TABLE IF NOT EXISTS vote (
      ID SERIAL PRIMARY KEY,
      noteID INT REFERENCES note(ID),
      customerID INT REFERENCES customers(ID),
      created DATE DEFAULT CURRENT_DATE,
      details TEXT
    );
  `;

  const insertedVotes = await Promise.all(
    votes.map(
      (vote) => sql`
        INSERT INTO vote (noteID, customerID, created, details)
        VALUES (${vote.noteID}, ${vote.customerID}, ${vote.created}, ${vote.details})
        ON CONFLICT (ID) DO NOTHING;
      `,
    ),
  );

  return insertedVotes;
}

// Main seed function
export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCustomers(),
      seedQuotes(),
      seedNotes(),
      seedVotes(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
