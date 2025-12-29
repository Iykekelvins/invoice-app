'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn } = useUser();

	if (!isSignedIn) {
		return redirect('/auth');
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			{children}
		</SidebarProvider>
	);
};

export default AppLayout;
