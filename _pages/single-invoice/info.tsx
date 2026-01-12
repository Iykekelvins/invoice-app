import { InvoiceProps } from '@/types';
import { addDays, format } from 'date-fns';

export default function Info({ invoice }: { invoice: InvoiceProps }) {
	const due_date = format(
		addDays(new Date(invoice.invoice_date), +invoice.payment_terms),
		'PP'
	);

	const amount_due = `N ${invoice.items
		.reduce((sum, item) => sum + item.qty * item.price, 0)
		.toLocaleString()}`;

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
						{invoice._id}
					</h2>
					<p className='text-13 text-grey-07 mt-1.75 font-medium'>
						{invoice.project_description}
					</p>
				</div>

				<p className='text-13 text-grey-07 font-medium md:text-right'>
					{invoice.bill_from_address} <br />
					{invoice.bill_from_city} <br />
					{invoice.bill_from_post_code} <br />
					{invoice.bill_from_country}
				</p>
			</div>

			<div className='mt-7.5 grid grid-cols-2 md:grid-cols-3 gap-y-8'>
				<div className='flex flex-col justify-between'>
					<div>
						<h3 className='text-13 text-grey-07 font-medium'>Invoice Date</h3>
						<p className='mt-2 text-15 font-bold'>
							{format(invoice.invoice_date, 'PP')}
						</p>
					</div>

					<div>
						<h3 className='text-13 text-grey-07 font-medium'>Payment Due</h3>
						<p className='mt-2 text-15 font-bold'>{due_date}</p>
					</div>
				</div>

				<div>
					<h3 className='text-13 text-grey-07 font-medium'>Bill To</h3>
					<p className='mt-2 text-15 font-bold'>{invoice.client_name}</p>
					<p className='mt-1.75 text-13 text-grey-07 font-medium'>
						{invoice.client_address} <br />
						{invoice.client_city} <br />
						{invoice.client_post_code} <br />
						{invoice.client_country}
					</p>
				</div>
				{invoice.status !== 'draft' && (
					<div>
						<h3 className='text-13 text-grey-07 font-medium'>Sent to</h3>
						<p className='mt-2 text-15 font-bold'>{invoice.client_email}</p>
					</div>
				)}
			</div>

			{/* Item List */}
			<div className='mt-9.5 bg-grey-04 rounded-t-lg p-6'>
				<ul className='flex flex-col gap-6 md:hidden'>
					{invoice.items.map((item, i) => (
						<li className='flex items-center justify-between' key={i}>
							<div>
								<h4 className='text-15 font-bold'>{item.item_name}</h4>
								<p className='text-15 text-grey-07 font-bold mt-1'>
									{`${item.qty} x N ${item.price.toFixed(2)}`}
								</p>
							</div>
							<p className='text-15 font-bold'>
								{`N ${(item.price * item.qty).toFixed(2)}`}
							</p>
						</li>
					))}
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
						{invoice.items.map((item, i) => (
							<tr key={i}>
								<td className='py-4 text-15 font-bold'>{item.item_name}</td>
								<td className='text-grey-07 py-4 text-15 font-bold text-center'>
									{item.qty}
								</td>
								<td className='text-grey-07 py-4 text-15 font-bold text-right'>
									{`N ${item.price.toFixed(2).toLocaleString()}`}
								</td>
								<td className='py-4 text-15 font-bold text-right'>
									{' '}
									{`N ${(item.price * item.qty).toFixed(2)}`}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Amount Due */}

			<div className='bg-grey-08-bg rounded-b-lg p-8 flex items-center justify-between'>
				<h4 className='text-white text-13 font-medium'>Amount Due</h4>
				<p className='text-white text-2xl font-bold'>{amount_due}</p>
			</div>
		</div>
	);
}
