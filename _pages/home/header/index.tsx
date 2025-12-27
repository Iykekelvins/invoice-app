import { Button } from '@/components/ui/button';
import Status from './status';

export default function Header() {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h1 className='text-2xl md:text-4xl font-bold tracking-tight'>Invoices</h1>
				<p className='text-grey-06 text-[0.813rem] font-medium mt-1.5'>
					No invoices
				</p>
			</div>

			<div className='flex items-center gap-4.5 md:gap-[2.534rem]'>
				<Status />
				<Button className='pl-2'>
					<span
						className='flex items-center justify-center bg-white rounded-full
					size-8
					'>
						<svg
							width='10'
							height='10'
							viewBox='0 0 10 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M6.29017 10V6.29017H10V3.70983H6.29017V0H3.70983V3.70983H0V6.29017H3.70983V10H6.29017Z'
								fill='#7C5DFA'
							/>
						</svg>
					</span>
					<span>
						New <span className='hidden md:inline'>Invoice</span>
					</span>
				</Button>
			</div>
		</div>
	);
}
