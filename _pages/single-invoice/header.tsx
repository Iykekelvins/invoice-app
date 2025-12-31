'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { getStatusTag } from '@/components/status';
import { InvoiceProps } from '@/types';
import { Button } from '@/components/ui/button';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { pdf } from '@react-pdf/renderer';

import InvoiceForm from '@/components/invoice-form';
import DeleteInvoice from './delete-invoice';
import InvoicePDF from '@/components/invoice-pdf';
import Spinner from '@/components/spinner';
import { DownloadIcon } from 'lucide-react';

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
	const [isDownloading, setIsDownloading] = useState(false);

	const due_date = format(
		addDays(new Date(invoice.invoice_date), +invoice.payment_terms),
		'PP'
	);

	const amount_due = `N ${invoice.items
		.reduce((sum, item) => sum + item.qty * item.price, 0)
		.toLocaleString()}`;

	const updateStatus = useMutation(api.invoices.updateInvoiceStatus);

	const handleUpdateStatus = async () => {
		await updateStatus({
			id: invoice._id,
			status: invoice.status === 'paid' ? 'pending' : 'paid',
		});
	};

	const handleDownloadPDF = async () => {
		setIsDownloading(true);

		try {
			const blob = await pdf(
				<InvoicePDF invoice={{ ...invoice, payment_terms: due_date, amount_due }} />
			).toBlob();
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `invoice-${invoice._id}.pdf`;
			link.click();

			URL.revokeObjectURL(url);
		} catch (error) {
			console.log(error, 'Failed to download PDF');
		} finally {
			setIsDownloading(false);
		}
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
				<div className='flex items-center gap-2'>
					{getStatusTag(invoice.status)}
					<Button
						className='bg-paid hover:bg-paid-bg hover:text-paid md:hidden gap-2'
						onClick={handleDownloadPDF}
						disabled={isDownloading}>
						<DownloadIcon size={20} /> PDF
						{isDownloading && <Spinner />}
					</Button>
				</div>
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
				<Button onClick={handleUpdateStatus}>
					Mark as {invoice.status === 'paid' ? 'Pending' : 'Paid'}
				</Button>
				<Button
					className='bg-paid hover:bg-paid-bg hover:text-paid hidden md:block'
					onClick={handleDownloadPDF}
					disabled={isDownloading}>
					Download PDF
					{isDownloading && <Spinner />}
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
