// lib/generateInvoicePDF.tsx (note: .tsx extension)
import { renderToBuffer } from '@react-pdf/renderer';
import { InvoiceProps } from '@/types';
import { format, addDays } from 'date-fns';

import InvoicePDF from '@/components/invoice-pdf';

export async function generateInvoicePDF(invoice: InvoiceProps) {
	const amount_due = `N ${invoice.items
		.reduce((sum, item) => sum + item.qty * item.price, 0)
		.toLocaleString()}`;

	const due_date = format(
		addDays(new Date(invoice.invoice_date), +invoice.payment_terms),
		'PP'
	);

	const pdfBuffer = await renderToBuffer(
		<InvoicePDF
			invoice={{ ...invoice, amount_due: amount_due, payment_terms: due_date }}
		/>
	);
	return pdfBuffer;
}
