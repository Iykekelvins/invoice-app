/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { generateInvoicePDF } from '@/lib/generateInvoicePDF';
import { formatNumber } from '@/lib/utils';

import * as brevo from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
	try {
		const { invoice, sender_name } = await request.json();

		const amount_due = `N ${formatNumber(
			invoice.items.reduce((sum: any, item: any) => sum + item.qty * item.price, 0)
		)}`;

		// Generate PDF
		const pdfBuffer = await generateInvoicePDF(invoice);

		// Setup Brevo
		const apiInstance = new brevo.TransactionalEmailsApi();
		apiInstance.setApiKey(
			brevo.TransactionalEmailsApiApiKeys.apiKey,
			process.env.BREVO_API_KEY!
		);

		const sendSmtpEmail = new brevo.SendSmtpEmail();
		sendSmtpEmail.subject = `Invoice for ${invoice.project_description} project with ${sender_name}.`;
		sendSmtpEmail.to = [{ email: invoice.client_email, name: invoice.client_name }];
		sendSmtpEmail.sender = {
			email: 'invoices@iyke-invoice.xyz',
			name: sender_name,
		};
		sendSmtpEmail.htmlContent = `
      <p>Dear ${invoice.client_name},</p>
      <p>Please find attached your invoice for ${amount_due}.</p>
    `;
		sendSmtpEmail.attachment = [
			{
				content: pdfBuffer.toString('base64'),
				name: `invoice-${invoice._id}.pdf`,
			},
		];

		const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
		return NextResponse.json({ success: true, data });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
