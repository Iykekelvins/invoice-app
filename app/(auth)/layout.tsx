'use client';

import { withOutAuth } from '../withoutAuth';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default withOutAuth(AuthLayout);
