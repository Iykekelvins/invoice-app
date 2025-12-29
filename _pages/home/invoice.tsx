import { getStatusTag } from '@/components/status';
import { cn } from '@/lib/utils';
import { InvoiceProps } from '@/types';
import { addDays, format } from 'date-fns';
import { ChevronRight } from 'lucide-react';

import Link from 'next/link';

export default function Invoice({ ...inv }: InvoiceProps) {
	const amount_due = `N${inv.items
		.reduce((sum, item) => sum + item.qty * item.price, 0)
		.toLocaleString()}`;

	const due_date = format(
		addDays(new Date(inv.invoice_date), +inv.payment_terms),
		'PP'
	);

	return (
		<li
			className={cn(
				'bg-white-bg rounded-lg shadow-[0px_10px_10px_-10px_#48549F1A]',
				'transition-all duration-300 ease-in-out',
				'border border-transparent hover:border-purple'
			)}>
			<Link
				href={`/invoice/${inv._id}`}
				className='flex items-center justify-between py-6 md:py-4 pl-6 md:pl-8 pr-4'>
				<div className='hidden md:flex items-center gap-10'>
					<p className='text-15 font-bold'>
						<span className='text-grey-07'>#</span>
						{inv._id.slice(0, 6).toUpperCase()}...
					</p>

					<p className='text-15 font-medium'>
						<span className='text-grey-06'>Due </span>
						<span className='text-grey'>{due_date}</span>
					</p>

					<p className='text-[0.875rem] font-medium text-grey'>{inv.client_name}</p>
				</div>

				<div className='hidden md:flex items-center'>
					<p className='text-15 font-bold mr-10'>{amount_due}</p>
					{getStatusTag(inv.status)}
					<ChevronRight color='var(--purple)' className='ml-5' />
				</div>

				<div className='md:hidden'>
					<p className='text-15 font-bold'>
						<span className='text-grey-07'>#</span>
						{inv._id.slice(0, 6).toUpperCase()}...
					</p>

					<div className='mt-6'>
						<p className='text-15 font-medium'>
							<span className='text-grey-06'>Due </span>
							<span className='text-grey'>{due_date}</span>
						</p>

						<p className='text-15 font-bold mt-2.25'>{amount_due}</p>
					</div>
				</div>

				<div className='md:hidden'>
					<p
						className='text-[0.875rem] font-medium text-grey text-right
          mb-6.5
          '>
						{inv.client_name}
					</p>
					{getStatusTag(inv.status)}
				</div>
			</Link>
		</li>
	);
}
