'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn } = useUser();

	if (isSignedIn) {
		return redirect('/');
	}

	return <>{children}</>;
};

export default AuthLayout;
