/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useStoreUserEffect } from '@/lib/useStoreUserEffect';
import { redirect } from 'next/navigation';

export const withOutAuth = (WrappedComponent: any) => {
	return function WithOutAuth(props: any) {
		const { isAuthenticated, isLoading } = useStoreUserEffect();

		if (isLoading) return;

		if (isAuthenticated) {
			redirect('/');
		}
		return <WrappedComponent {...props} />;
	};
};
