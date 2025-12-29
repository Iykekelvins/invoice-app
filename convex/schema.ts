import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		tokenIdentifier: v.string(),
		email: v.string(),
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
	}).index('by_token', ['tokenIdentifier']),

	invoices: defineTable({
		userId: v.id('users'), // Reference to the users table

		// Bill From
		bill_from_address: v.string(),
		bill_from_city: v.string(),
		bill_from_post_code: v.string(),
		bill_from_country: v.string(),

		// Client Info
		client_name: v.string(),
		client_email: v.string(),
		client_address: v.string(),
		client_city: v.string(),
		client_post_code: v.string(),
		client_country: v.string(),

		invoice_date: v.number(),
		payment_terms: v.string(),
		project_description: v.string(),

		items: v.array(
			v.object({
				item_name: v.string(),
				qty: v.number(),
				price: v.number(),
			})
		),
	}).index('by_user', ['userId']),
});
