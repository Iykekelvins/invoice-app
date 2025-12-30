'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
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

export default function DeleteInvoice({
	openDeleteModal,
	setOpenDeleteModal,
	invoiceId,
}: {
	openDeleteModal: boolean;
	setOpenDeleteModal: (e: boolean) => void;
	invoiceId: Id<'invoices'>;
}) {
	const deleteInvoice = useMutation(api.invoices.deleteInvoice);
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const handleDeleteInvoice = async () => {
		setLoading(true);

		try {
			const result = await deleteInvoice({ id: invoiceId });
			toast.success(result.message);
			setOpenDeleteModal(false);
			router.replace('/');

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error.message || 'Failed to delete invoice');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
			<DialogContent showCloseButton={false}>
				<DialogTitle className='text-2xl font-bold'>Confirm Deletion</DialogTitle>
				<DialogDescription className='text-grey-06! text-13 font-medium mt-3'>
					Are you sure you want to delete invoice #XM9141? This action cannot be
					undone.
				</DialogDescription>

				<div className='mt-3.5 flex items-center gap-2 justify-end'>
					<Button variant={'secondary'} onClick={() => setOpenDeleteModal(false)}>
						Cancel
					</Button>
					<Button
						variant={'destructive'}
						disabled={loading}
						onClick={handleDeleteInvoice}>
						Delete
						{loading && <Spinner />}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
