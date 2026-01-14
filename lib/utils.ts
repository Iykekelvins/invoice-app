import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(value: number | string): string {
	const num = typeof value === 'number' ? value : Number(value.replace(/,/g, ''));

	if (Number.isNaN(num)) {
		throw new Error('Invalid numeric value');
	}

	return num.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}
