import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { metaDataOptions } from '@/lib/metadata';

import './globals.css';
import Navbar from '@/shared/navbar';

const leagueSpartan = League_Spartan({
	variable: '--font-league-spartan',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Invoice App',
	description: 'A simple invoicing app',
	...metaDataOptions,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${leagueSpartan.variable}  antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem
					disableTransitionOnChange>
					<SidebarProvider>
						<AppSidebar />
						<div
							className='flex-1 flex flex-col min-h-screen
						px-6 md:px-12 max-w-182.5 mx-auto
						'>
							<Navbar />
							<main>{children}</main>
						</div>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
