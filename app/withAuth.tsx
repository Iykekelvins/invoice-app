/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useStoreUserEffect } from '@/lib/useStoreUserEffect';
import { redirect } from 'next/navigation';

import Spinner from '@/components/spinner';

export const withAuth = (WrappedComponent: any) => {
	return function WithAuth(props: any) {
		const { isAuthenticated, isLoading } = useStoreUserEffect();

		if (isLoading) {
			return (
				<div className='min-h-screen flex items-center justify-center'>
					<Spinner />
				</div>
			);
		}

		if (!isAuthenticated) {
			redirect('/auth');
		}
		return <WrappedComponent {...props} />;
	};
};
