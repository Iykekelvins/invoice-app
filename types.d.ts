interface InvoiceProps {
	bill_from_address: string;
	bill_from_city: string;
	bill_from_post_code: string;
	bill_from_country: string;
	client_name: string;
	client_email: string;
	client_address: string;
	client_city: string;
	client_post_code: string;
	client_country: string;
	invoice_date: Date;
	payment_terms: string;
	project_description: string;
	items: {
		item_name: string;
		qty: number;
		price: number;
	}[];
}
