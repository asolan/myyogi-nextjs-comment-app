"use client";

import { createCustomer, CustomerState } from "@/app/lib/actions";
import { useActionState } from "react";
import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";

export default function Form() {
  const initialState: CustomerState = { message: null, errors: {} };

  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Customer Name
          </label>
          <div className="relative">
            <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter Customer Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative">
            <input
                id="email"
                name="email"
                type="string"
                placeholder="Enter Customer Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer image_url */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Customer Image Url
          </label>
          <div className="relative">
            <input
                id="image_url"
                name="image_url"
                type="string"
                placeholder="Enter Customer Image Url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image_url-error"
                />
          </div>
          <div id="image_url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
