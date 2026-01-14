import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { metaDataOptions } from '@/lib/metadata';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const leagueSpartan = League_Spartan({
	variable: '--font-league-spartan',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Invoice App',
	description:
		'A full-stack invoice management application built with Next.js, featuring Google authentication, real-time database syncing, and PDF generation capabilities.',
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
						<main>{children}</main>
						<Toaster position='top-center' richColors />
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
