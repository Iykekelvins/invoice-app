'use client';

import { useState } from 'react';
import { getStatusTag } from '@/components/status';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import InvoiceForm from '@/components/invoice-form';

export default function Header({ position }: { position: 'top' | 'bottom' }) {
	const [openInvoiceForm, setOpenInvoiceForm] = useState(false);

	return (
		<div
			className={cn(
				`
      mt-7.5 rounded-lg bg-white-bg py-5 px-8
      shadow-[0px_10px_10px_-10px_#48549F1A] flex
      items-center justify-between
      `,
				position === 'bottom' &&
					'max-md:fixed bottom-0 left-0 max-md:w-full md:hidden'
			)}>
			<div
				className={cn(
					'flex items-center gap-5 w-full',

					position === 'top' && 'max-md:justify-between',
					position === 'bottom' && 'hidden'
				)}>
				<h1 className='text-grey text-13 font-medium'>Status</h1>
				{getStatusTag('pending')}
			</div>

			<div
				className={cn(
					position === 'top' && 'hidden md:flex items-center gap-2',
					position === 'bottom' && 'flex items-center justify-between gap-2'
				)}>
				<Button variant={'secondary'} onClick={() => setOpenInvoiceForm(true)}>
					Edit
				</Button>
				<Button variant={'destructive'} className='px-5'>
					Delete
				</Button>
				<Button>Mark as Paid</Button>
			</div>

			<InvoiceForm
				openInvoiceForm={openInvoiceForm}
				setOpenInvoiceForm={setOpenInvoiceForm}
				invoice
			/>
		</div>
	);
}
