import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  CustomerForm,
  QuoteForm,
  QuotesTable,
  LatestQuoteRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  const rev: Revenue[] = [];
  return  rev;
  // try {
  //   const data = await sql<Revenue[]>`SELECT * FROM revenue`;

  //   return data;
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch revenue data.');
  // }
}

export async function fetchLatestQuotes() {
  try {
    // console.log('Fetching fetchLatestQuotes data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<LatestQuoteRaw[]>`
      SELECT 
        quote.chapterNum as "chapterNum", 
        quote.paragraphNum as "paragraphNum", 
        quote.posStart as "posStart", 
        quote.posEnd as "posEnd", 
        quote.created, 
        quote.isActive as "isActive", 
        customer.name, 
        customer.image_url,
        customer.email,
        quote.ID
      FROM quote
      JOIN customer ON quote.customerID = customer.ID
      ORDER BY quote.created DESC
      LIMIT 5`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest quotes.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const quoteCountPromise = sql`SELECT COUNT(*) FROM quote`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customer`;
    // const quoteStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM quote`;

    // const data = await Promise.all([
    //   quoteCountPromise,
    //   customerCountPromise,
    //   quoteStatusPromise,
    // ]);

    // const numberOfQuotes = Number(data[0][0].count ?? '0');
    // const numberOfCustomers = Number(data[1][0].count ?? '0');
    // const totalPaidQuotes = formatCurrency(data[2][0].paid ?? '0');
    // const totalPendingQuotes = formatCurrency(data[2][0].pending ?? '0');
    const numberOfQuotes = '0'; // Number(data[0][0].count ?? '0');
    const numberOfCustomers = '0'; //Number(data[1][0].count ?? '0');
    const totalPaidQuotes = '0'; // formatCurrency(data[2][0].paid ?? '0');
    const totalPendingQuotes = '0'; // formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfQuotes,
      totalPaidQuotes,
      totalPendingQuotes,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredQuotes(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const quote = await sql<QuotesTable[]>`
      SELECT
        quote.ID as "ID",
        quote.customerID as "customerID",
        customer.name,
        customer.email,
        customer.image_url,
        quote.chapterNum as "chapterNum",
        quote.paragraphNum as "paragraphNum",
        quote.posStart as "posStart",
        quote.posEnd as "posEnd",
        quote.created,
        quote.isActive as "isActive"
      FROM quote
      JOIN customer ON quote.customerID = customer.ID
      WHERE
        customer.name ILIKE ${`%${query}%`} OR
        customer.email ILIKE ${`%${query}%`} OR
        quote.created::text ILIKE ${`%${query}%`}
      ORDER BY quote.created DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    console.log(quote);
    return quote;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quotes.');
  }
};


export async function fetchQuotesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM quote
    JOIN customer ON quote.customerID = customer.ID
    WHERE
      customer.name ILIKE ${`%${query}%`} OR
      customer.email ILIKE ${`%${query}%`} OR
      quote.chapterNum::text ILIKE ${`%${query}%`} OR
      quote.paragraphNum::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of quotes.');
  }
}

export async function fetchQuoteById(ID: string) {
  try {
    const data = await sql<QuoteForm[]>`
      SELECT
        quote.ID as "ID",
        quote.customerID as "customerID",
        quote.chapterNum as "chapterNum",
        quote.paragraphNum as "paragraphNum",
        quote.posStart as "posStart",
        quote.posEnd as "posEnd",
        quote.created,
        quote.isActive as "isActive"
      FROM quote
      WHERE quote.ID = ${ID};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quote.');
  }
}

export async function fetchCustomers() {
  try {
    const customer = await sql<CustomerField[]>`
      SELECT
        ID as ID,
        name
      FROM customer
      ORDER BY name ASC
    `;

    return customer;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(
  query: string, 
  currentPage: number) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customer.ID as "ID",
		  customer.name,
		  customer.email,
		  customer.image_url,
		  COUNT(quote.ID) AS total_quotes,
      COUNT(note.ID) AS total_notes,
		  COUNT(vote.ID) AS total_votes 
		FROM customer
		LEFT JOIN quote ON customer.ID = quote.customerID
		LEFT JOIN note ON customer.ID = note.customerID
		LEFT JOIN vote ON customer.ID = vote.customerID
		WHERE
		  customer.name ILIKE ${`%${query}%`} OR
      customer.email ILIKE ${`%${query}%`} OR
		  customer.image_url ILIKE ${`%${query}%`} 
		GROUP BY customer.ID, customer.name, customer.email, customer.image_url
		ORDER BY customer.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM customer
    WHERE
      customer.name ILIKE ${`%${query}%`} OR
      customer.email ILIKE ${`%${query}%`} OR
      customer.image_url ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchCustomerById(ID: string) {
  try {
    const data = await sql<CustomerForm[]>`
      SELECT
        customer.ID as "ID",
        customer.name,
        customer.email,
        customer.image_url
      FROM customer
      WHERE customer.ID = ${ID};
    `;

    const customer = data[0];

    console.log(customer); // Customer is an empty array []
    return customer;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

