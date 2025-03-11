'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* Zod Form Schemas */ 

// Quote Form Schema
const QuoteFormSchema = z.object({
  ID: z.string(),
  customerID: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  chapterNum: z.coerce
    .number(),
  paragraphNum: z.coerce
    .number(),
  posStart: z.coerce
    .number(),
  posEnd: z.coerce
    .number(),
  isActive: z.boolean({
    required_error: "isActive is required",
    invalid_type_error: "isActive must be a boolean",
  }),
});

// Note Form Schema
const NoteFormSchema = z.object({
  ID: z.string(),
  customerID: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  quoteID: z.string({
    invalid_type_error: 'Please select a quote.',
  }),
  title: z.string({
    required_error: 'Title is required.',
    invalid_type_error: 'Title must be a string.',
  }),
  details: z.string({
    required_error: 'Details are required.',
    invalid_type_error: 'Details must be a string.',
  }),
  created: z.string(),
  updated: z.string(),
  status: z.string({
    required_error: 'Status is required.',
    invalid_type_error: 'Status must be a string.',
  }),
});

// Vote Form Schema
const VoteFormSchema = z.object({
  ID: z.string(),
  noteID: z.string({
    invalid_type_error: 'Please select a note.',
  }),
  customerID: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  created: z.string(),
  details: z.string({
    required_error: 'Details are required.',
    invalid_type_error: 'Details must be a string.',
  }),
});

/* Error States Schemas */ 

export type QuoteState = {
  errors?: {
    customerID?: string[];
    chapterNum?: string[];
    paragraphNum?: string[];
    posStart?: string[];
    posEnd?: string[];
    isActive?: string[];
  };
  message?: string | null;
};

export type NoteState = {
  errors?: {
    customerID?: string[];
    quoteID?: string[];
    title?: string[];
    details?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type VoteState = {
  errors?: {
    noteID?: string[];
    customerID?: string[];
    details?: string[];
  };
  message?: string | null;
};

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

/* Quote Table methods */ 

const CreateQuote = QuoteFormSchema.omit({ ID: true});

export async function createQuote(prevState: QuoteState, formData: FormData) {
  const validatedFields = CreateQuote.safeParse({
    customerID: formData.get('customerID'),
    chapterNum: formData.get('chapterNum'),
    paragraphNum: formData.get('paragraphNum'),
    posStart: formData.get('posStart'),
    posEnd: formData.get('posEnd'),
    isActive: formData.get('isActive')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Quote.',
    };
  }

  const {customerID, 
    chapterNum,
    paragraphNum,
    posStart,
    posEnd,
    isActive} = validatedFields.data;

  try{
    await sql`
      INSERT INTO quote 
        (customerID, 
        chapterNum, 
        paragraphNum, 
        posStart, 
        posEnd, 
        isActive, 
        created)
      VALUES (
        ${customerID}, 
        ${chapterNum}, 
        ${paragraphNum}, 
        ${posStart}, 
        ${posEnd}, 
        ${isActive}, 
        new Date())`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Quote.',
    };
  } 


  revalidatePath('/dashboard/quotes');
  redirect('/dashboard/quotes');

};

// Use Zod to update the expected types
const UpdateQuote = QuoteFormSchema.omit({ ID: true});

export async function updateQuote(
  ID: string,
  prevState: QuoteState,
  formData: FormData,
) {
  const validatedFields = UpdateQuote.safeParse({
    customerID: formData.get('customerID'),
    chapterNum: formData.get('chapterNum'),
    paragraphNum: formData.get('paragraphNum'),
    posStart: formData.get('posStart'),
    posEnd: formData.get('posEnd'),
    isActive: formData.get('isActive')
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Quote.',
    };
  }
 

  const {customerID, 
    chapterNum,
    paragraphNum,
    posStart,
    posEnd,
    isActive} = validatedFields.data;
 
  try {
    await sql`
      UPDATE quote 
      SET customerID =   ${customerID}, 
      chapterNum = ${chapterNum}, 
      paragraphNum = ${paragraphNum}, 
      posStart = ${posStart}, 
      posEnd = ${posEnd}, 
      isActive = ${isActive}
      WHERE ID = ${ID}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Quote.' };
  }
 
  revalidatePath('/dashboard/quotes');
  redirect('/dashboard/quotes');
}

export async function deleteQuote(ID: string) {
//  throw new Error('Failed to Delete Quote');
  
  try {
    await sql`DELETE FROM quote WHERE ID = ${ID}`;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  } 
  revalidatePath('/dashboard/quotes');
}

/* Customer actions */ 

const CustomerFormSchema = z.object({
  ID: z.string(),
  name: z.string({ 
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  image_url: z.string({ 
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
//  image_url: z.string().url({ message: "Invalid url" }),
});

/* End Quote Table methods */ 

/* Note Table methods */ 
const CreateNote = NoteFormSchema.omit({ ID: true });

export async function createNote(prevState: NoteState, formData: FormData) {
  const validatedFields = CreateNote.safeParse({
    customerID: formData.get('customerID'),
    quoteID: formData.get('quoteID'),
    title: formData.get('title'),
    details: formData.get('details'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Note.',
    };
  }

  const { customerID, quoteID, title, details, status } = validatedFields.data;

  try {
    await sql`
      INSERT INTO note 
        (customerID, quoteID, title, details, created, updated, status)
      VALUES (
        ${customerID}, 
        ${quoteID}, 
        ${title}, 
        ${details}, 
        NOW(), 
        NOW(), 
        ${status})`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Note.',
    };
  }

  revalidatePath('/dashboard/notes');
  redirect('/dashboard/notes');
}

const UpdateNote = NoteFormSchema.omit({ ID: true });

export async function updateNote(
  ID: string,
  prevState: NoteState,
  formData: FormData,
) {
  const validatedFields = UpdateNote.safeParse({
    customerID: formData.get('customerID'),
    quoteID: formData.get('quoteID'),
    title: formData.get('title'),
    details: formData.get('details'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Note.',
    };
  }

  const { customerID, quoteID, title, details, status } = validatedFields.data;

  try {
    await sql`
      UPDATE note 
      SET customerID = ${customerID}, 
          quoteID = ${quoteID}, 
          title = ${title}, 
          details = ${details}, 
          updated = NOW(), 
          status = ${status}
      WHERE ID = ${ID}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Note.' };
  }

  revalidatePath('/dashboard/notes');
  redirect('/dashboard/notes');
}

export async function deleteNote(ID: string) {
  try {
    await sql`DELETE FROM note WHERE ID = ${ID}`;
  } catch (error) {
    console.error(error);
  }
  revalidatePath('/dashboard/notes');
}
/* End Note Table methods */ 

/* Vote Table methods */ 
const CreateVote = VoteFormSchema.omit({ ID: true });

export async function createVote(prevState: VoteState, formData: FormData) {
  const validatedFields = CreateVote.safeParse({
    noteID: formData.get('noteID'),
    customerID: formData.get('customerID'),
    details: formData.get('details'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Vote.',
    };
  }

  const { noteID, customerID, details } = validatedFields.data;

  try {
    await sql`
      INSERT INTO vote 
        (noteID, customerID, details, created)
      VALUES (
        ${noteID}, 
        ${customerID}, 
        ${details}, 
        NOW())`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Vote.',
    };
  }

  revalidatePath('/dashboard/votes');
  redirect('/dashboard/votes');
}

const UpdateVote = VoteFormSchema.omit({ ID: true });

export async function updateVote(
  ID: string,
  prevState: VoteState,
  formData: FormData,
) {
  const validatedFields = UpdateVote.safeParse({
    noteID: formData.get('noteID'),
    customerID: formData.get('customerID'),
    details: formData.get('details'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Vote.',
    };
  }

  const { noteID, customerID, details } = validatedFields.data;

  try {
    await sql`
      UPDATE vote 
      SET noteID = ${noteID}, 
          customerID = ${customerID}, 
          details = ${details}
      WHERE ID = ${ID}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Vote.' };
  }

  revalidatePath('/dashboard/votes');
  redirect('/dashboard/votes');
}

export async function deleteVote(ID: string) {
  try {
    await sql`DELETE FROM vote WHERE ID = ${ID}`;
  } catch (error) {
    console.error(error);
  }
  revalidatePath('/dashboard/votes');
}/* End Vote Table methods */ 

/* Customer Table methods */ 

const CreateCustomer = CustomerFormSchema.omit({ ID: true });

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  const { name, email, image_url } = validatedFields.data;

  try{
    await sql`
      INSERT INTO customer (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  } 


  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');

};

// Use Zod to update the expected types
const UpdateCustomer = CustomerFormSchema.omit({ ID: true });

export async function updateCustomer(
  ID: string,
  prevState: CustomerState,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customers.',
    };
  }
 
  const { name, email, image_url } = validatedFields.data;
 
  try {
    await sql`
      UPDATE customer
      SET name = ${name}, email = ${email}, image_url = ${image_url}
      WHERE ID = ${ID}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' };
  }
 
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(ID: string) {
//  throw new Error('Failed to Delete Customer');
  
  try {
    await sql`DELETE FROM customer WHERE ID = ${ID}`;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  } 
  revalidatePath('/dashboard/customers');
}
/* End Customer Table methods */ 

/* authenticate */

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  console.log('authenticate', formData);
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.log('authenticateerror', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
