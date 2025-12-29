'use client';

import { useParams } from 'next/navigation';

export default function Info() {
	const params = useParams();

	return (
		<div
			className='rounded-lg bg-white-bg p-6 
      xl:pt-12.5 xl:pb-12 md:px-8 md:py-8
      shadow-[0px_10px_10px_-10px_#48549F1A] mt-6'>
			<div
				className='flex md:items-center justify-between
      flex-col md:flex-row gap-7.5
      '>
				<div>
					<h2 className='text-15 font-bold'>
						<span className='text-grey-06'>#</span>
						{params.invoiceId}
					</h2>
					<p className='text-13 text-grey-07 mt-1.75 font-medium'>Graphic Design</p>
				</div>

				<p className='text-13 text-grey-07 font-medium md:text-right'>
					19 Union Terrace <br />
					London <br />
					E1 3EZ <br />
					United Kingdom
				</p>
			</div>

			<div className='mt-7.5 grid grid-cols-2 md:grid-cols-3 gap-y-8'>
				<div className='flex flex-col justify-between'>
					<div>
						<h3 className='text-13 text-grey-07 font-medium'>Invoice Date</h3>
						<p className='mt-2 text-15 font-bold'>21 Aug 2021</p>
					</div>

					<div>
						<h3 className='text-13 text-grey-07 font-medium'>Payment Due</h3>
						<p className='mt-2 text-15 font-bold'>20 Sep 2021</p>
					</div>
				</div>

				<div>
					<h3 className='text-13 text-grey-07 font-medium'>Bill To</h3>
					<p className='mt-2 text-15 font-bold'>Alex Grim</p>
					<p className='mt-1.75 text-13 text-grey-07 font-medium'>
						84 Church Way <br />
						Bradford <br />
						BD1 9PB <br />
						United Kingdomm
					</p>
				</div>

				<div>
					<h3 className='text-13 text-grey-07 font-medium'>Sent to</h3>
					<p className='mt-2 text-15 font-bold'>alexgrim@mail.com</p>
				</div>
			</div>

			{/* Item List */}
			<div className='mt-9.5 bg-grey-04 rounded-t-lg p-6'>
				<ul className='flex flex-col gap-6 md:hidden'>
					<li className='flex items-center justify-between'>
						<div>
							<h4 className='text-15 font-bold'>Banner Design</h4>
							<p className='text-15 text-grey-07 font-bold mt-1'>1 x £ 156.00</p>
						</div>
						<p className='text-15 font-bold'>£ 156.00</p>
					</li>
					<li className='flex items-center justify-between'>
						<div>
							<h4 className='text-15 font-bold'>Email Design</h4>
							<p className='text-15 text-grey-07 font-bold mt-1'>2 x £ 200.00</p>
						</div>
						<p className='text-15 font-bold'>£ 400.00</p>
					</li>
				</ul>

				<table className='hidden md:table w-full'>
					<thead>
						<tr>
							<th className='pb-4 text-13 text-grey-07 font-medium text-left'>
								Item Name
							</th>
							<th className='pb-4 text-13 text-grey-07 font-medium text-center'>
								QTY.
							</th>
							<th className='pb-4 text-13 text-grey-07 font-medium text-right'>
								Price
							</th>
							<th className='pb-4 text-13 text-grey-07 font-medium text-right'>
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='py-4 text-15 font-bold'>Banner Design</td>
							<td className='text-grey-07 py-4 text-15 font-bold text-center'>1</td>
							<td className='text-grey-07 py-4 text-15 font-bold text-right'>
								£ 156.00
							</td>
							<td className='py-4 text-15 font-bold text-right'>£ 156.00</td>
						</tr>
						<tr>
							<td className='py-4 text-15 font-bold'>Banner Design</td>
							<td className='text-grey-07 py-4 text-15 font-bold text-center'>1</td>
							<td className='text-grey-07 py-4 text-15 font-bold text-right'>
								£ 156.00
							</td>
							<td className='py-4 text-15 font-bold text-right'>£ 156.00</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Amount Due */}

			<div className='bg-grey-08-bg rounded-b-lg p-8 flex items-center justify-between'>
				<h4 className='text-white text-13 font-medium'>Amount Due</h4>
				<p className='text-white text-2xl font-bold'>£ 556.00</p>
			</div>
		</div>
	);
}
