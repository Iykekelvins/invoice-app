'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from '@/components/ui/sidebar';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

import Image from 'next/image';
import Link from 'next/link';

export function AppSidebar() {
	const { theme, setTheme } = useTheme();
	const { user } = useUser();

	const [mounted, setMounted] = useState(false);
	const [loading, setLoading] = useState(false);

	// The hydration error is happening because useTheme() from next-themes returns undefined during
	// server-side rendering, but returns the actual theme value on the client side

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMounted(true);
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<Sidebar
			className='rounded-tr-[1.25rem] rounded-br-[1.25rem] 
    overflow-hidden border-sidebar'>
			<SidebarHeader className='p-0'>
				<Link href='/' aria-label='Home page'>
					<Image src='/favicon.png' width={103} height={103} alt='app logo' />
				</Link>
			</SidebarHeader>

			<SidebarContent />

			<SidebarFooter
				className='p-0 flex flex-col items-center justify-center
      
      '>
				<button
					className='mb-8'
					onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
					{!mounted ? (
						<div />
					) : theme === 'dark' ? (
						<svg
							width='10'
							height='10'
							viewBox='0 0 10 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M4.91783 0C2.20609 0 0 2.20652 0 4.91826C0 7.63 2.20609 9.83652 4.91783 9.83652C7.62913 9.83652 9.83565 7.63043 9.83565 4.91826C9.83565 2.20609 7.62913 0 4.91783 0Z'
								fill='#858BB2'
							/>
						</svg>
					) : (
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z'
								fill='#7E88C3'
							/>
						</svg>
					)}
				</button>
				<span className='bg-[#494E6E] h-px w-full' />
				<div className='py-6'>
					<Popover>
						<PopoverTrigger>
							<Image
								src={user?.imageUrl as string}
								width={40}
								height={40}
								alt='user profile picture'
								className='rounded-full'
							/>
						</PopoverTrigger>
						<PopoverContent
							align='start'
							className='bg-white-bg p-4 z-52 shadow-[0px_10px_10px_-10px_#48549F1A]'>
							<p className='text-15'>{user?.fullName}</p>
							<SignOutButton redirectUrl='/auth'>
								<Button
									variant={'destructive'}
									className='h-10! mt-4'
									onClick={() => setLoading(true)}
									disabled={loading}>
									Sign out
									{loading && (
										<svg
											className='animate-spin h-5 w-5 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											/>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											/>
										</svg>
									)}
								</Button>
							</SignOutButton>
						</PopoverContent>
					</Popover>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
