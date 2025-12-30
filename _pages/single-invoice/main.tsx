'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import Header from './header';
import Info from './info';
import Spinner from '@/components/spinner';
import EmptyState from '../home/empty-state';

export default function Main() {
	const params = useParams();

	const invoice = useQuery(api.invoices.getInvoice, {
		id: params.invoiceId as Id<'invoices'>,
	});

	if (invoice === undefined) {
		return (
			<div className='flex-1 flex items-center justify-center'>
				<Spinner />
			</div>
		);
	}

	if (invoice === null) {
		return (
			<div className='flex-1 flex items-center justify-center'>
				<EmptyState singleInvoice />
			</div>
		);
	}

	return (
		<>
			<Header position='top' invoice={invoice!} />
			<Info invoice={invoice!} />
			<Header position='bottom' invoice={invoice!} />
		</>
	);
}
