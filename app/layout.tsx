import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
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
	metadataBase: new URL('https://invoice-app-tau-sage.vercel.app/'),
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
				<ConvexClientProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='light'
						enableSystem
						disableTransitionOnChange>
						<Navbar />

						<div
							className='flex-1 flex flex-col min-h-screen
						px-6 xl:px-0 max-w-195.5 mx-auto
						'>
							<main>{children}</main>
						</div>
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
