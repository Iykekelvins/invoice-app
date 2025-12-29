'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import EmptyState from './empty-state';
import Spinner from '@/components/spinner';
import Header from './header';
import Invoice from './invoice';

export default function Main() {
	const [status, setStatus] = useState<'pending' | 'paid' | ''>('');

	const invoices = useQuery(
		api.invoices.getInvoices,
		status === '' ? {} : { status }
	);

	return (
		<>
			<Header invoices={invoices!} status={status} setStatus={setStatus} />
			{!invoices ? (
				<div className='flex items-center justify-center flex-1'>
					<Spinner />
				</div>
			) : invoices.length === 0 ? (
				<EmptyState />
			) : (
				<ul className='mt-8 md:mt-14 xl:mt-16 grid gap-4'>
					{invoices.map((inv) => (
						<Invoice key={inv._id} {...inv} />
					))}
				</ul>
			)}
		</>
	);
}
