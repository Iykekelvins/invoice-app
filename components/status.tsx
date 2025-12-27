import { cn } from '@/lib/utils';

export function getStatusTag(status: 'paid' | 'pending' | 'draft') {
	switch (status) {
		case 'paid':
			return (
				<span
					className={cn(
						'flex items-center justify-center gap-2',
						'w-26 h-10 bg-paid-bg rounded-md',
						'text-paid capitalize text-[0.938rem] font-bold'
					)}>
					<span className='bg-paid size-2 rounded-full' />
					{status}
				</span>
			);

		case 'pending':
			return (
				<span
					className={cn(
						'flex items-center justify-center gap-2',
						'w-26 h-10 bg-pending-bg rounded-md',
						'text-pending capitalize text-[0.938rem] font-bold'
					)}>
					<span className='bg-pending size-2 rounded-full' />
					{status}
				</span>
			);

		case 'draft':
			return (
				<span
					className={cn(
						'flex items-center justify-center gap-2',
						'w-26 h-10 bg-draft-bg rounded-md',
						'text-draft capitalize text-[0.938rem] font-bold'
					)}>
					<span className='bg-draft size-2 rounded-full' />
					{status}
				</span>
			);

		default:
			break;
	}
}
