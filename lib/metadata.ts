import { Metadata } from 'next';

const title = 'Invoice app';
const description =
	'A full-stack invoice management application built with Next.js, featuring Google authentication, real-time database syncing, and PDF generation capabilities.';
export const url = '';

const keywords = [''];

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
