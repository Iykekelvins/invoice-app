/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';

export const withAuth = (WrappedComponent: any) => {
	return function WithAuth(props: any) {
		const { isAuthenticated, isLoading } = useConvexAuth();

		if (isLoading) return;

		if (!isAuthenticated) {
			redirect('/auth');
		}
		return <WrappedComponent {...props} />;
	};
};
