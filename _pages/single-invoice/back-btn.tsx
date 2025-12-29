'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackBtn() {
	const router = useRouter();

	return (
		<button
			className='flex items-center gap-6 text-15 font-bold'
			onClick={() => router.back()}>
			<ChevronLeftIcon color='var(--purple)' />
			Go back
		</button>
	);
}
