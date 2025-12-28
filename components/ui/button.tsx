import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	`flex items-center justify-center gap-4 whitespace-nowrap
  transition-all duration-300 ease-in-out text-15
	font-bold
  `,
	{
		variants: {
			variant: {
				primary: 'bg-purple hover:bg-purple-hover text-white',
				secondary: 'bg-grey-05 hover:bg-grey-04-hover text-grey-07',
				tertiary: 'bg-[#373B53] hover:bg-[#0C0E16] text-grey-06 dark:text-grey-05',
				ghost: '',
			},
			size: {
				default: 'h-[2.75rem] md:h-12 rounded-full px-4',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	}
);

function Button({
	className,
	variant = 'primary',
	size = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
