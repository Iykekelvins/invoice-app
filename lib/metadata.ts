import { Metadata } from 'next';

const title = 'Invoice app';
const description =
	'A full-stack invoice management application built with Next.js, featuring Google authentication, real-time database syncing, and PDF generation capabilities.';
export const url = 'https://www.iyke-invoice.xyz';

const keywords = [
	'invoice generator',
	'invoicing software',
	'online invoice',
	'create invoice',
	'invoice maker',
	'billing software',
	'invoice management',
	'digital invoicing',
	'freelancer invoice',
	'small business invoicing',
	'contractor billing',
	'consultant invoice',
	'self-employed invoicing',
	'send invoice email',
	'PDF invoice',
	'invoice tracking',
	'payment tracking',
	'invoice templates',
	'custom invoices',
	'professional invoices',
	'invoice automation',
	'generate invoice online',
	'email invoice to client',
	'track payments',
	'manage clients',
	'invoice history',
	'free invoice software',
	'simple invoicing',
	'fast invoice creation',
	'easy billing',
	'invoice online free',
	'NextJS invoice app',
	'web-based invoicing',
	'cloud invoice software',
	'invoice SaaS',
];

export const metaDataOptions: Metadata = {
	generator: 'Next.js',
	applicationName: 'Invoice app',
	referrer: 'origin-when-cross-origin',
	keywords,
	authors: [{ name: 'Kelvin Ochubili', url: 'https://twitter.com/iykekelvins' }],
	creator: 'Kelvin Ochubili',
	publisher: 'Kelvin Ochubili',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title,
		description,
		url,
		siteName: 'Invoice app',
		images: [
			{
				url: '/opengraph-image.png',
				width: 800,
				height: 600,
			},
			{
				url: '/opengraph-image.png',
				width: 1800,
				height: 1600,
				alt: 'Invoice app',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	icons: {
		icon: '/favicon.png',
		shortcut: '/favicon.png',
		apple: '/favicon.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: '/favicon.png',
		},
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		creator: '@iykekelvins',
		images: ['/opengraph-image.png'],
	},
	alternates: {
		canonical: '/',
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};
