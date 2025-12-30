'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { getStatusTag } from '@/components/status';
import { InvoiceProps } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import InvoiceForm from '@/components/invoice-form';
import DeleteInvoice from './delete-invoice';

export default function Header({
	position,
	invoice,
}: {
	position: 'top' | 'bottom';
	invoice: InvoiceProps;
}) {
	const [openInvoiceForm, setOpenInvoiceForm] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [edittingInvoice, setEdittingInvoice] = useState<InvoiceProps | null>(null);

	const updateStatus = useMutation(api.invoices.updateInvoiceStatus);

	const handleUpdateStatus = async () => {
		await updateStatus({
			id: invoice._id,
			status: 'paid',
		});
	};

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
				{getStatusTag(invoice.status)}
			</div>

			<div
				className={cn(
					position === 'top' && 'hidden md:flex items-center gap-2',
					position === 'bottom' && 'flex items-center justify-between gap-2'
				)}>
				<Button
					variant={'secondary'}
					onClick={() => {
						setOpenInvoiceForm(true);
						setEdittingInvoice(invoice);
					}}>
					Edit
				</Button>
				<Button
					variant={'destructive'}
					className='px-5'
					onClick={() => setOpenDeleteModal(true)}>
					Delete
				</Button>
				<Button
					disabled={invoice.status === 'paid'}
					className='disabled:opacity-70 disabled:cursor-not-allowed!'
					onClick={handleUpdateStatus}>
					Mark as Paid
				</Button>
			</div>

			<InvoiceForm
				openInvoiceForm={openInvoiceForm}
				setOpenInvoiceForm={setOpenInvoiceForm}
				invoice={edittingInvoice}
			/>

			<DeleteInvoice
				openDeleteModal={openDeleteModal}
				setOpenDeleteModal={setOpenDeleteModal}
				invoiceId={invoice._id}
			/>
		</div>
	);
}
