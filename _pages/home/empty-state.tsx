import Image from 'next/image';

export default function EmptyState() {
	return (
		<div className='flex-1 flex flex-col items-center justify-center'>
			<Image
				src='/empty-state.png'
				width={241.34}
				height={200}
				alt='empty state graphic for no invoices'
			/>

			<h2 className='text-2xl font-bold mt-10.5 md:mt-16.5 text-center'>
				There is nothing here
			</h2>
			<p className='mt-6 text-grey-06 font-medium text-center'>
				Create an invoice by clicking the <br />
				<span className='font-bold'>New Invoice</span> button and get started
			</p>
		</div>
	);
}
