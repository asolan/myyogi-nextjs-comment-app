import Form from '@/app/ui/quotes/edit-form';
import Breadcrumbs from '@/app/ui/quotes/breadcrumbs';
import { fetchCustomers, fetchQuoteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // const customers = await fetchCustomers();
  // const quote = await fetchQuoteById(id);
  const [quote, customers] = await Promise.all([
    fetchQuoteById(id),
    fetchCustomers(),
  ]);

  if (!quote) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quotes', href: '/dashboard/quotes' },
          {
            label: 'Edit Quote',
            href: `/dashboard/quotes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form quote={quote} customers={customers} />
    </main>
  );
}