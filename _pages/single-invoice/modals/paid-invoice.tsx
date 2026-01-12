'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';

import Spinner from '@/components/spinner';

export default function PaidInvoice({
	openPaidModal,
	setOpenPaidModal,
	invoiceId,
}: {
	openPaidModal: boolean;
	setOpenPaidModal: (e: boolean) => void;
	invoiceId: Id<'invoices'>;
}) {
	const updateInvoiceStatus = useMutation(api.invoices.updateInvoiceStatus);

	const [loading, setLoading] = useState(false);

	const handleUpdateInvoice = async () => {
		setLoading(true);

		try {
			const result = await updateInvoiceStatus({
				id: invoiceId,
				status: 'paid',
			});
			toast.success(result.message);
			setOpenPaidModal(false);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error.message || 'Failed to update invoice status');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openPaidModal} onOpenChange={setOpenPaidModal}>
			<DialogContent showCloseButton={false}>
				<DialogTitle className='text-2xl font-bold'>Confirm Update</DialogTitle>
				<DialogDescription className='text-grey-06! text-13 font-medium mt-3'>
					Are you sure you want to mark this invoice as paid? This action cannot be
					undone.
				</DialogDescription>

				<div className='mt-3.5 flex items-center gap-2 justify-end'>
					<Button variant={'secondary'} onClick={() => setOpenPaidModal(false)}>
						Cancel
					</Button>
					<Button disabled={loading} onClick={handleUpdateInvoice}>
						Continue
						{loading && <Spinner />}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
