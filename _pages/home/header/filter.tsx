'use client';

import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function Filter({
	status,
	setStatus,
}: {
	status: 'pending' | 'paid' | '';
	setStatus: (e: 'pending' | 'paid' | '') => void;
}) {
	const [open, setOpen] = useState(false);

	const STATUSES = ['pending', 'paid'];

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger
				className='text-15 font-bold tracking-tight
      flex items-center gap-3 md:gap-3.5
      '>
				<span>
					Filter <span className='hidden md:inline'>by status</span>
				</span>
				<ChevronDown
					color='var(--purple)'
					strokeWidth={3}
					className={cn(
						'transition-transform duration-300 ease-in-out',
						open && '-rotate-180'
					)}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='center'
				className='w-48 rounded-lg border-0
        shadow-[0px_10px_20px_0px_#48549F40]
        mt-4 p-6 bg-white-bg dark:bg-[#252945]
        dark:shadow-[0px_10px_20px_0px_#00000040]
        '>
				{STATUSES.map((st) => (
					<DropdownMenuItem
						key={st}
						className='flex items-start gap-3.5
          cursor-pointer group
          '>
						<Checkbox
							id={st}
							checked={status === st}
							onCheckedChange={() =>
								setStatus(status === st ? '' : (st as 'pending' | 'paid'))
							}
							className={cn(
								'rounded-xs border-2 border-grey-05 bg-grey-05 size-5',
								'group-hover:border-purple transition-all duration-300',
								'[&_svg]:stroke-white [&_svg]:stroke-3',
								st === status && 'border-purple bg-purple'
							)}
						/>
						<label
							htmlFor={st}
							className='text-15 font-bold cursor-pointer capitalize'>
							{st}
						</label>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
