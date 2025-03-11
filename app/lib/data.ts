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
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestQuotes() {
  try {
    // console.log('Fetching fetchLatestQuotes data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<LatestQuoteRaw[]>`
      SELECT quotes.amount, customers.name, customers.image_url, customers.email, quotes.id
      FROM quotes
      JOIN customers ON quotes.customer_id = customers.id
      ORDER BY quotes.date DESC
      LIMIT 5`;

    const latestQuotes = data.map((quote) => ({
      ...quote,
      amount: formatCurrency(quote.amount),
    }));
    return latestQuotes;
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
    const quoteCountPromise = sql`SELECT COUNT(*) FROM quotes`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const quoteStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM quotes`;

    const data = await Promise.all([
      quoteCountPromise,
      customerCountPromise,
      quoteStatusPromise,
    ]);

    const numberOfQuotes = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidQuotes = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingQuotes = formatCurrency(data[2][0].pending ?? '0');

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
    const quotes = await sql<QuotesTable[]>`
      SELECT
        quotes.id,
        quotes.amount,
        quotes.date,
        quotes.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM quotes
      JOIN customers ON quotes.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        quotes.amount::text ILIKE ${`%${query}%`} OR
        quotes.date::text ILIKE ${`%${query}%`} OR
        quotes.status ILIKE ${`%${query}%`}
      ORDER BY quotes.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return quotes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quotes.');
  }
};


export async function fetchQuotesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM quotes
    JOIN customers ON quotes.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      quotes.amount::text ILIKE ${`%${query}%`} OR
      quotes.date::text ILIKE ${`%${query}%`} OR
      quotes.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of quotes.');
  }
}

export async function fetchQuoteById(id: string) {
  try {
    const data = await sql<QuoteForm[]>`
      SELECT
        quotes.id,
        quotes.customer_id,
        quotes.amount,
        quotes.status
      FROM quotes
      WHERE quotes.id = ${id};
    `;

    const quote = data.map((quote) => ({
      ...quote,
      // Convert amount from cents to dollars
      amount: quote.amount / 100,
    }));

    console.log(quote); // Quote is an empty array []
    return quote[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quote.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
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
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(quotes.id) AS total_quotes,
		  SUM(CASE WHEN quotes.status = 'pending' THEN quotes.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN quotes.status = 'paid' THEN quotes.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN quotes ON customers.id = quotes.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
		  customers.image_url ILIKE ${`%${query}%`} 
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      customers.image_url ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const data = await sql<CustomerForm[]>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url
      FROM customers
      WHERE customers.id = ${id};
    `;

    const customer = data[0];

    console.log(customer); // Customer is an empty array []
    return customer;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

