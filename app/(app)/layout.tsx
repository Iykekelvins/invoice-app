'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { withAuth } from '../withAuth';

import Navbar from '@/shared/navbar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
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

export default withAuth(AppLayout);
