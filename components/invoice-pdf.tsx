import { formatNumber } from '@/lib/utils';
import { InvoiceProps } from '@/types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
	page: {
		padding: 40,
		backgroundColor: '#FFFFFF',
		fontFamily: 'Helvetica',
		fontSize: 10,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 40,
	},
	_id: {
		fontSize: 14,
		color: '#0C0E16',
		marginBottom: 4,
	},
	project_description: {
		fontSize: 11,
		color: '#0C0E16',
		marginBottom: 20,
	},
	address: {
		fontSize: 10,
		color: '#7E88C3',
		textAlign: 'right',
		lineHeight: 1.5,
	},
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 50,
	},
	infoBlock: {
		flex: 1,
	},
	label: {
		fontSize: 10,
		color: '#7E88C3',
		marginBottom: 8,
	},
	value: {
		fontSize: 11,
		color: '#0C0E16',
		marginBottom: 3,
	},
	valueBold: {
		fontSize: 11,
		color: '#0C0E16',
		fontFamily: 'Helvetica-Bold',
		marginBottom: 3,
	},
	table: {
		marginTop: 30,
		marginBottom: 20,
	},
	tableHeader: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#7E88C3',
		paddingBottom: 10,
		marginBottom: 15,
	},
	tableRow: {
		flexDirection: 'row',
		paddingVertical: 12,
	},
	col1: {
		width: '45%',
	},
	col2: {
		width: '15%',
		textAlign: 'center',
	},
	col3: {
		width: '20%',
		textAlign: 'right',
	},
	col4: {
		width: '20%',
		textAlign: 'right',
	},
	tableHeaderText: {
		fontSize: 10,
		color: '#7E88C3',
		fontFamily: 'Helvetica-Bold',
	},
	tableText: {
		fontSize: 10,
		color: '#0C0E16',
	},
	tableTextBold: {
		fontSize: 10,
		color: '#0C0E16',
		fontFamily: 'Helvetica-Bold',
	},
	totalSection: {
		backgroundColor: '#374151',
		padding: 20,
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
	},
	totalLabel: {
		fontSize: 12,
		color: '#FFFFFF',
	},
	totalAmount: {
		fontSize: 24,
		color: '#FFFFFF',
		fontFamily: 'Helvetica-Bold',
	},
});

const InvoicePDF = ({
	invoice,
}: {
	invoice: InvoiceProps & {
		amount_due: string;
	};
}) => {
	// Sample data structure - replace with your actual data
	const data: InvoiceProps = invoice;

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{/* Header */}
				<View style={styles.header}>
					<View>
						<Text style={styles._id}>#{data._id.toUpperCase()}</Text>
						<Text style={styles.project_description}>
							{data.project_description}
						</Text>
					</View>
					<View>
						<Text style={styles.address}>{data.bill_from_address}</Text>
						<Text style={styles.address}>{data.bill_from_city}</Text>
						<Text style={styles.address}>{data.bill_from_post_code}</Text>
						<Text style={styles.address}>{data.bill_from_country}</Text>
					</View>
				</View>

				{/* Info Section */}
				<View style={styles.infoSection}>
					<View style={styles.infoBlock}>
						<Text style={styles.label}>Invoice Date</Text>
						<Text style={styles.valueBold}>{format(data.invoice_date, 'PP')}</Text>
					</View>

					<View style={styles.infoBlock}>
						<Text style={styles.label}>Bill To</Text>
						<Text style={styles.valueBold}>{data.client_name}</Text>
						<Text style={styles.value}>{data.client_address}</Text>
						<Text style={styles.value}>{data.client_city}</Text>
						<Text style={styles.value}>{data.client_post_code}</Text>
						<Text style={styles.value}>{data.client_country}</Text>
					</View>

					{invoice.status !== 'draft' && (
						<View style={styles.infoBlock}>
							<Text style={styles.label}>Sent to</Text>
							<Text style={styles.valueBold}>{data.client_email}</Text>
						</View>
					)}
				</View>

				<View style={styles.infoSection}>
					<View style={styles.infoBlock}>
						<Text style={styles.label}>Payment Due</Text>
						<Text style={styles.valueBold}>{data.payment_terms}</Text>
					</View>
					<View style={styles.infoBlock}></View>
					<View style={styles.infoBlock}></View>
				</View>

				{/* Table */}
				<View style={styles.table}>
					<View style={styles.tableHeader}>
						<Text style={[styles.tableHeaderText, styles.col1]}>Item Name</Text>
						<Text style={[styles.tableHeaderText, styles.col2]}>QTY.</Text>
						<Text style={[styles.tableHeaderText, styles.col3]}>Price</Text>
						<Text style={[styles.tableHeaderText, styles.col4]}>Total</Text>
					</View>

					{data.items.map((item, index) => (
						<View key={index} style={styles.tableRow}>
							<Text style={[styles.tableTextBold, styles.col1]}>
								{item.item_name}
							</Text>
							<Text style={[styles.tableText, styles.col2]}>{item.qty}</Text>
							<Text style={[styles.tableText, styles.col3]}>
								{formatNumber(item.price)}
							</Text>
							<Text style={[styles.tableTextBold, styles.col4]}>
								{formatNumber(item.price * item.qty)}
							</Text>
						</View>
					))}
				</View>

				{/* Total */}
				<View style={styles.totalSection}>
					<Text style={styles.totalLabel}>Amount Due</Text>
					<Text style={styles.totalAmount}>{invoice.amount_due}</Text>
				</View>
			</Page>
		</Document>
	);
};

export default InvoicePDF;
