import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';

export default function DeleteInvoice({
	openDeleteModal,
	setOpenDeleteModal,
}: {
	openDeleteModal: boolean;
	setOpenDeleteModal: (e: boolean) => void;
}) {
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
					<Button variant={'destructive'}>Delete</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
