import Form from '@/app/ui/quotes/create-form';
import Breadcrumbs from '@/app/ui/quotes/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quotes', href: '/dashboard/quotes' },
          {
            label: 'Create Quote',
            href: '/dashboard/quotes/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}