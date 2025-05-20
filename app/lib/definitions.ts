// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  ID: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  ID: string;
  name: string;
  email: string;
  image_url: string;
};

export type Quote = {
  ID: string;
  customerID: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestQuote = {
  ID: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestQuoteRaw = Omit<LatestQuote, 'amount'> & {
  amount: number;
};

export type QuotesTable = {
  ID: string;
  customerID: string;
  name: string;
  email: string;
  image_url: string;
  chapterNum: number;
  paragraphNum: number;
  posStart: number;
  posEnd: number;
  created: string;
  isActive: boolean;
};

export type CustomersTableType = {
  ID: string;
  name: string;
  email: string;
  image_url: string;
  total_quotes: number;
  total_notes: number;
  total_votes: number;
};

export type FormattedCustomersTable = {
  ID: string;
  name: string;
  email: string;
  image_url: string;
  total_quotes: number;
  total_notes: string;
  total_votes: string;
};

export type CustomerField = {
  ID: string;
  name: string;
};

export type QuoteForm = {
  ID: string;
  customerID: string;
  chapterNum: number;
  paragraphNum: number;
  posStart: number;
  posEnd: number;
  created: string;
  isActive: boolean;
};

export type CustomerForm = {
  ID: string;
  name: string;
  email: string;
  image_url: string;
};
