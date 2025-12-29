'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';

import Image from 'next/image';

export default function Auth() {
	const [loading, setLoading] = useState(false);

	return (
		<div className='flex-1 flex flex-col items-center justify-center gap-4'>
			<Image src='/favicon.png' width={60} height={60} alt='app logo' />

			<SignInButton mode='redirect' forceRedirectUrl='/'>
				<Button onClick={() => setLoading(true)} disabled={loading}>
					Sign in with Google
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
			</SignInButton>
		</div>
	);
}
