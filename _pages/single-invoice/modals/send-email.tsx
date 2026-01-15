'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { InvoiceProps } from '@/types';

import Spinner from '@/components/spinner';

export default function SendEmail({
	openEmailModal,
	setOpenEmailModal,
	invoice,
}: {
	openEmailModal: boolean;
	setOpenEmailModal: (e: boolean) => void;
	invoice: InvoiceProps;
}) {
	const user = useUser();
	const updateInvoiceStatus = useMutation(api.invoices.updateInvoiceStatus);

	const [loading, setLoading] = useState(false);

	const handleUpdateInvoice = async () => {
		setLoading(true);

		try {
			const res = await fetch('/api/send-invoice', {
				headers: {
					'content-type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					invoice,
					sender_name: user.user?.fullName,
					sender_email: user.user?.emailAddresses[0].emailAddress,
				}),
			});

			if (res.ok) {
				await updateInvoiceStatus({
					id: invoice._id,
					status: 'pending',
				});
				toast.success(
					`A copy of your invoice has been sent to ${invoice.client_email}.`
				);
				setOpenEmailModal(false);
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error.message || 'Failed to send email. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={openEmailModal} onOpenChange={setOpenEmailModal}>
			<DialogContent showCloseButton={false}>
				<DialogTitle className='text-2xl font-bold'>Send Invoice</DialogTitle>
				<DialogDescription className='text-grey-06! text-13 font-medium mt-3'>
					You are about to send this invoice to your client&apos;s email (
					{invoice.client_email}). Please make sure to go through every detail before
					proceeding.
				</DialogDescription>

				<div className='mt-3.5 flex items-center gap-2 justify-end'>
					<Button variant={'secondary'} onClick={() => setOpenEmailModal(false)}>
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
