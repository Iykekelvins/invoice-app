'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

import Navbar from '@/shared/navbar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn } = useUser();

	if (!isSignedIn) {
		return redirect('/auth');
	}

	return (
		<>
			<Navbar />
			<SidebarProvider>
				<AppSidebar />
				<div
					className='flex-1 flex flex-col min-h-screen
										px-6 xl:px-0 max-w-195.5 mx-auto
										'>
					{children}
				</div>
			</SidebarProvider>
		</>
	);
};

export default AppLayout;
