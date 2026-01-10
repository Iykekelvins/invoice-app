/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { generateInvoicePDF } from '@/lib/generateInvoicePDF';

import * as brevo from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
	try {
		const { invoice, sender_email, sender_name } = await request.json();

		const amount_due = `N ${invoice.items
			.reduce((sum: any, item: any) => sum + item.qty * item.price, 0)
			.toLocaleString()}`;

		// Generate PDF
		const pdfBuffer = await generateInvoicePDF(invoice);

		// Setup Brevo
		const apiInstance = new brevo.TransactionalEmailsApi();
		apiInstance.setApiKey(
			brevo.TransactionalEmailsApiApiKeys.apiKey,
			process.env.BREVO_API_KEY!
		);

		const sendSmtpEmail = new brevo.SendSmtpEmail();
		sendSmtpEmail.subject = `Invoice #${invoice._id}`;
		sendSmtpEmail.to = [{ email: invoice.client_email, name: invoice.client_name }];
		sendSmtpEmail.sender = {
			email: sender_email,
			name: sender_name,
		};
		sendSmtpEmail.htmlContent = `
      <h2>Invoice #${invoice._id}</h2>
      <p>Dear ${invoice.client_name},</p>
      <p>Please find attached your invoice for ${amount_due}.</p>
    `;
		sendSmtpEmail.attachment = [
			{
				content: pdfBuffer.toString('base64'),
				name: `invoice-${invoice.number}.pdf`,
			},
		];

		const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
		return NextResponse.json({ success: true, data });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
