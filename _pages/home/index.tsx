import Header from './header';
import EmptyState from './empty-state';
import Invoice from './invoice';

const Homepage = () => {
	return (
		<div className='pt-8 md:pt-12 xl:pt-[4.813rem] flex flex-col flex-1'>
			<Header />
			{/* <EmptyState /> */}
			<ul className='mt-8 md:mt-14 xl:mt-16 grid gap-4'>
				<Invoice
					id='RT3080'
					due_date='19 Jun 2021'
					client_name='Jensen Huang'
					amount_due='£ 1,800.90'
					status='paid'
				/>
				<Invoice
					id='RT3080'
					due_date='19 Aug 2021'
					client_name='Mellisa Clarke'
					amount_due='£ 1,800.90'
					status='pending'
				/>
				<Invoice
					id='RT3080'
					due_date='19 May 2021'
					client_name='Anita Wainwright'
					amount_due='£ 1,800.90'
					status='draft'
				/>
			</ul>
		</div>
	);
};

export default Homepage;
