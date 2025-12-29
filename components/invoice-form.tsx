/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from '@/components/ui/sheet';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

import Spinner from './spinner';

const message = "can't be empty";

const formSchema = z.object({
	bill_from_address: z.string().min(2, {
		message,
	}),
	bill_from_city: z.string().min(2, {
		message,
	}),
	bill_from_post_code: z.string().min(2, {
		message,
	}),
	bill_from_country: z.string().min(2, {
		message,
	}),
	client_name: z.string().min(2, {
		message,
	}),
	client_email: z.email(),
	client_address: z.string().min(2, {
		message,
	}),
	client_city: z.string().min(2, {
		message,
	}),
	client_post_code: z.string().min(2, {
		message,
	}),
	client_country: z.string().min(2, {
		message,
	}),
	invoice_date: z.date({ message }),
	payment_terms: z.string().min(1, {
		message,
	}),
	project_description: z.string().min(2, {
		message,
	}),
	items: z.array(
		z.object({
			item_name: z.string().min(2, { message }),
			qty: z.any(),
			price: z.any(),
		})
	),
});

const PAYMENT_TERMS = [
	{
		key: '1',
		value: 'Net 1 Day',
	},
	{
		key: '7',
		value: 'Net 7 Days',
	},
	{
		key: '14',
		value: 'Net 14 Days',
	},
	{
		key: '30',
		value: 'Net 30 Days',
	},
];

export default function InvoiceForm({
	openInvoiceForm,
	setOpenInvoiceForm,
	invoice,
}: {
	openInvoiceForm: boolean;
	setOpenInvoiceForm: (e: boolean) => void;
	invoice?: any;
}) {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bill_from_address: '',
			bill_from_city: '',
			bill_from_country: '',
			bill_from_post_code: '',
			client_address: '',
			client_city: '',
			client_country: '',
			client_email: '',
			client_name: '',
			client_post_code: '',
			payment_terms: '',
			invoice_date: undefined,
			project_description: '',
			items: [{ item_name: '', qty: 1, price: 0 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	});

	const items = useWatch({
		control: form.control,
		name: 'items',
	});

	const addItem = () => append({ item_name: '', qty: 1, price: 0 });

	const handleDiscard = () => {
		form.reset();
		setOpenInvoiceForm(false);
	};

	const createInvoice = useMutation(api.invoices.createInvoice);

	const [loading, setLoading] = useState(false);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);

		try {
			if (!invoice) {
				const result = await createInvoice({
					...values,
					invoice_date: values.invoice_date.getTime(),
					items: values.items.map((item) => {
						return {
							item_name: item.item_name,
							price: +item.price,
							qty: +item.qty,
						};
					}),
					status: 'pending',
				});

				toast.success(result.message);
				router.push(`/invoice/${result.invoiceId}`);
				handleDiscard();
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to create invoice');
		} finally {
			setLoading(false);
		}
	}

	return (
		<Sheet open={openInvoiceForm} onOpenChange={setOpenInvoiceForm}>
			<SheetContent
				className='bg-[#F8F8FB] max-w-154 xl:max-w-[44.938rem] w-full border-0 
        md:rounded-r-[1.25rem] dark:bg-[#141625]
        pt-7.5 md:pt-[3.688rem] bottom-0!
        '
				side='left'>
				<div
					className='pl-6 md:pl-14 lg:pl-[9.938rem] pr-6 md:pr-14 overflow-y-auto pb-36
				
				'>
					<button
						className='flex items-center gap-6 md:hidden text-15 font-bold mb-6'
						onClick={handleDiscard}>
						<ChevronLeftIcon color='var(--purple)' />
						Go back
					</button>
					<SheetTitle className='text-2xl font-bold'>
						{!invoice ? (
							'New Invoice'
						) : (
							<span>
								Edit <span className='text-grey-06'>#</span>XM9141
							</span>
						)}
					</SheetTitle>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
							{/* Bill From Fields */}
							<div>
								<h3 className='text-15 text-purple font-bold'>Bill From</h3>
								<FormField
									control={form.control}
									name='bill_from_address'
									render={({ field }) => (
										<FormItem className='mt-6'>
											<div className='flex items-center justify-between'>
												<FormLabel className='form-label'>Street Address</FormLabel>
												<FormMessage className='text-red text-[0.625rem] font-semibold' />
											</div>
											<FormControl>
												<Input className='form-input' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<div className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-6'>
									<FormField
										control={form.control}
										name='bill_from_city'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<FormLabel className='form-label'>City</FormLabel>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<FormControl>
													<Input className='form-input' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='bill_from_post_code'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<FormLabel className='form-label'>Post Code</FormLabel>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<FormControl>
													<Input className='form-input' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='bill_from_country'
										render={({ field }) => (
											<FormItem className='col-span-2 md:col-span-1'>
												<div className='flex items-center justify-between'>
													<FormLabel className='form-label'>Country</FormLabel>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<FormControl>
													<Input className='form-input' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>

							{/* Bill To Fields */}
							<div className='mt-[3.075rem]'>
								<h3 className='text-15 text-purple font-bold'>Bill To</h3>
								<div className='grid gap-6 mt-6'>
									<FormField
										control={form.control}
										name='client_name'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<FormLabel className='form-label'>
														Client&apos;s Name
													</FormLabel>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<FormControl>
													<Input className='form-input' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='client_email'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<FormLabel className='form-label'>
														Client&apos;s Email
													</FormLabel>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<FormControl>
													<Input className='form-input' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='client_address'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<FormLabel className='form-label'>
														Street Address
													</FormLabel>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<FormControl>
													<Input className='form-input' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
										<FormField
											control={form.control}
											name='client_city'
											render={({ field }) => (
												<FormItem>
													<div className='flex items-center justify-between'>
														<FormLabel className='form-label'>City</FormLabel>
														<FormMessage className='text-red text-[0.625rem] font-semibold' />
													</div>
													<FormControl>
														<Input className='form-input' {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='client_post_code'
											render={({ field }) => (
												<FormItem>
													<div className='flex items-center justify-between'>
														<FormLabel className='form-label'>Post Code</FormLabel>
														<FormMessage className='text-red text-[0.625rem] font-semibold' />
													</div>
													<FormControl>
														<Input className='form-input' {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='client_country'
											render={({ field }) => (
												<FormItem className='col-span-2 md:col-span-1'>
													<div className='flex items-center justify-between'>
														<FormLabel className='form-label'>Country</FormLabel>
														<FormMessage className='text-red text-[0.625rem] font-semibold' />
													</div>
													<FormControl>
														<Input className='form-input' {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<div className='mt-[3.075rem]'>
								<div className='grid md:grid-cols-2 gap-6'>
									<FormField
										control={form.control}
										name='invoice_date'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<label
														className={cn(
															'form-label',
															form.formState.errors.invoice_date && 'text-red!'
														)}>
														Invoice Date
													</label>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>

												<Popover>
													<PopoverTrigger asChild disabled={invoice}>
														<FormControl>
															<button
																className={cn(
																	`form-input transition-all duration-300 ease-in-out
															 		flex items-center justify-between px-3 disabled:cursor-not-allowed!
																	disabled:opacity-70
																	`,
																	form.formState.errors.invoice_date && 'border-red!'
																)}>
																<p>
																	{field.value ? (
																		format(field.value, 'PP')
																	) : (
																		<span></span>
																	)}
																</p>
																<svg
																	width='16'
																	height='16'
																	viewBox='0 0 16 16'
																	fill='none'
																	xmlns='http://www.w3.org/2000/svg'>
																	<path
																		fillRule='evenodd'
																		clipRule='evenodd'
																		d='M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z'
																		fill='#7E88C3'
																	/>
																</svg>
															</button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent>
														<Calendar
															mode='single'
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																date < new Date() || date < new Date('1900-01-01')
															}
														/>
													</PopoverContent>
												</Popover>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='payment_terms'
										render={({ field }) => (
											<FormItem>
												<div className='flex items-center justify-between'>
													<label
														className={cn(
															'form-label',
															form.formState.errors.payment_terms && 'text-red!'
														)}>
														Payment Terms
													</label>
													<FormMessage className='text-red text-[0.625rem] font-semibold' />
												</div>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger
															className={cn(
																`form-input transition-all duration-300 ease-in-out
															 		flex items-center justify-between px-3
																	`,
																form.formState.errors.payment_terms && 'border-red!'
															)}>
															<SelectValue className='font-bold' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{PAYMENT_TERMS.map((term) => (
															<SelectItem
																value={term.key}
																className={cn(
																	'py-3.5',
																	field.value === term.key && 'text-purple'
																)}
																key={term.key}>
																{term.value}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								</div>
							</div>

							<FormField
								control={form.control}
								name='project_description'
								render={({ field }) => (
									<FormItem className='mt-6'>
										<div className='flex items-center justify-between'>
											<FormLabel className='form-label'>
												Project Description
											</FormLabel>
											<FormMessage className='text-red text-[0.625rem] font-semibold' />
										</div>
										<FormControl>
											<Input className='form-input' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Item List */}
							<div className='mt-[2.188rem]'>
								<h3 className='text-15 text-purple font-bold'>Item List</h3>

								<table className='mt-[0.813rem] w-full hidden md:table'>
									<thead>
										<tr>
											<th className='text-grey-07 text-13 font-medium text-left'>
												Item Name
											</th>
											<th className='text-grey-07 text-13 font-medium text-left'>
												Qty.
											</th>
											<th className='text-grey-07 text-13 font-medium text-left'>
												Price
											</th>
											<th className='text-grey-07 text-13 font-medium text-left'>
												Total
											</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{fields.map((field, idx) => {
											const qty = items?.[idx]?.qty || 0;
											const price = items?.[idx]?.price || 0;
											const total = Number(qty * price).toFixed(2);

											return (
												<tr key={field.id}>
													<td className='pr-2 w-[40%]'>
														<FormField
															control={form.control}
															name={`items.${idx}.item_name`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input className='form-input' {...field} />
																	</FormControl>
																</FormItem>
															)}
														/>
													</td>
													<td className='px-2 py-2.25 w-[15%]'>
														<FormField
															control={form.control}
															name={`items.${idx}.qty`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			className='form-input'
																			type='number'
																			min='0'
																			{...field}
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
													</td>
													<td className='px-2 py-2.25 w-[25%]'>
														<FormField
															control={form.control}
															name={`items.${idx}.price`}
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			className='form-input'
																			type='number'
																			min='0'
																			{...field}
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
													</td>
													<td className='px-2 py-2.25 text-15 text-grey-06 font-bold'>
														{total.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													</td>
													<td className='px-2 py-2.25'>
														<button
															type='button'
															onClick={() => remove(idx)}
															disabled={items.length === 1}>
															<svg
																width='13'
																height='16'
																viewBox='0 0 13 16'
																fill='none'
																xmlns='http://www.w3.org/2000/svg'>
																<path
																	fillRule='evenodd'
																	clipRule='evenodd'
																	d='M8.44442 0L9.33333 0.888875H12.4444V2.66667H0V0.888875H3.11108L4 0H8.44442ZM2.66667 16C1.68442 16 0.888875 15.2045 0.888875 14.2222V3.55554H11.5555V14.2222C11.5555 15.2045 10.76 16 9.77779 16H2.66667Z'
																	fill='#888EB0'
																	className='transition-all duration-300 ease-in-out hover:fill-red'
																/>
															</svg>
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>

								<ul className='grid gap-[3.063rem] md:hidden mt-5.5'>
									{fields.map((field, idx) => {
										const qty = items?.[idx]?.qty || 0;
										const price = items?.[idx]?.price || 0;
										const total = Number(qty * price).toFixed(2);

										return (
											<li key={field.id}>
												<FormField
													control={form.control}
													name={`items.${idx}.item_name`}
													render={({ field }) => (
														<FormItem>
															<FormLabel className='form-label'>Item Name</FormLabel>
															<FormControl>
																<Input className='form-input' {...field} />
															</FormControl>
														</FormItem>
													)}
												/>

												<div className='flex items-center justify-between mt-6.5'>
													<div className='flex items-start gap-4'>
														<FormField
															control={form.control}
															name={`items.${idx}.qty`}
															render={({ field }) => (
																<FormItem className='flex-[0.2]'>
																	<FormLabel className='form-label'>Qty.</FormLabel>
																	<FormControl>
																		<Input
																			className='form-input'
																			type='number'
																			min='0'
																			{...field}
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name={`items.${idx}.price`}
															render={({ field }) => (
																<FormItem className='flex-[0.6]'>
																	<FormLabel className='form-label'>Price</FormLabel>
																	<FormControl>
																		<Input
																			className='form-input'
																			type='number'
																			min='0'
																			{...field}
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>

														<div>
															<h4 className='form-label'>Total</h4>
															<p className='text-15 text-grey-06 font-bold mt-4'>
																{total.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
															</p>
														</div>
													</div>

													<button
														type='button'
														onClick={() => remove(idx)}
														disabled={items.length === 1}>
														<svg
															width='13'
															height='16'
															viewBox='0 0 13 16'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'>
															<path
																fillRule='evenodd'
																clipRule='evenodd'
																d='M8.44442 0L9.33333 0.888875H12.4444V2.66667H0V0.888875H3.11108L4 0H8.44442ZM2.66667 16C1.68442 16 0.888875 15.2045 0.888875 14.2222V3.55554H11.5555V14.2222C11.5555 15.2045 10.76 16 9.77779 16H2.66667Z'
																fill='#888EB0'
															/>
														</svg>
													</button>
												</div>
											</li>
										);
									})}
								</ul>

								<Button
									variant='secondary'
									className='w-full mt-4.5'
									type='button'
									onClick={addItem}>
									+ Add New Item
								</Button>
							</div>
						</form>
					</Form>

					{Object.keys(form.formState.errors).length > 1 && (
						<SheetDescription className='text-red font-semibold text-[0.625rem] mt-2'>
							- All fields must be added <br />- An item must be added
						</SheetDescription>
					)}
					<SheetDescription hidden />
				</div>

				<div
					className='absolute bottom-0 left-0 w-full bg-background rounded-tr-[20px] 
					flex items-center justify-between shadow-[0px_10px_20px_0px_#00000040]
					py-7.5 pl-6 md:pl-14 lg:pl-[9.938rem] pr-6 md:pr-14
				'>
					<Button variant={'secondary'} onClick={handleDiscard}>
						Discard
					</Button>

					<div className='flex items-center gap-2'>
						<Button variant={'tertiary'}>Save as Draft</Button>
						<Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
							Save & Send
							{loading && <Spinner />}
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
