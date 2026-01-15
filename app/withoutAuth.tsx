/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';

export const withOutAuth = (WrappedComponent: any) => {
	return function WithOutAuth(props: any) {
		const { isAuthenticated, isLoading } = useConvexAuth();

		if (isLoading) return;

		if (isAuthenticated) {
			redirect('/');
		}
		return <WrappedComponent {...props} />;
	};
};
