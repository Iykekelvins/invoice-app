'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { InvoiceProps } from '@/types';
import { Button } from './ui/button';

export default function SendEmailCopy({
	setSendEmailCopy,
	openEmailCopyModal,
	setOpenEmailCopyModal,
	invoice,
}: {
	setSendEmailCopy: (e: boolean) => void;
	openEmailCopyModal: boolean;
	setOpenEmailCopyModal: (e: boolean) => void;
	invoice: InvoiceProps | null | undefined;
}) {
	const handleSendEmailCopy = () => {
		setSendEmailCopy(true);
		setOpenEmailCopyModal(false);
	};

	return (
		<Dialog open={openEmailCopyModal} onOpenChange={setOpenEmailCopyModal}>
			<DialogContent showCloseButton={false}>
				<DialogTitle className='text-2xl font-bold'>Resend Invoice</DialogTitle>
				<DialogDescription className='text-grey-06! text-13 font-medium mt-3'>
					You are about to resend this invoice to your client&apos;s email (
					{invoice?.client_email}). Please make sure you and your client are in
					agreement with the updated details of the invoice.
				</DialogDescription>

				<div className='mt-3.5 flex items-center gap-2 justify-end'>
					<Button variant={'secondary'} onClick={() => setOpenEmailCopyModal(false)}>
						Cancel
					</Button>
					<Button onClick={handleSendEmailCopy}>Continue</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
