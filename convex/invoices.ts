import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Get all invoices for current user
export const getInvoices = query({
	args: {
		status: v.optional(v.union(v.literal('pending'), v.literal('paid'))),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Not authenticated');
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', (q) =>
				q.eq('tokenIdentifier', identity.tokenIdentifier)
			)
			.unique();

		if (!user) {
			return [];
		}

		if (args.status) {
			return await ctx.db
				.query('invoices')
				.withIndex('by_user_and_status', (q) =>
					q.eq('userId', user._id).eq('status', args?.status as 'pending' | 'paid')
				)
				.collect();
		}

		return await ctx.db
			.query('invoices')
			.withIndex('by_user', (q) => q.eq('userId', user._id))
			.collect();
	},
});

// Get a single invoice
export const getInvoice = query({
	args: { id: v.id('invoices') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Not authenticated');
		}

		const invoice = await ctx.db.get(args.id);
		if (!invoice) {
			return null;
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', (q) =>
				q.eq('tokenIdentifier', identity.tokenIdentifier)
			)
			.unique();

		if (!user || invoice.userId !== user._id) {
			throw new Error('Unauthorized');
		}

		return invoice;
	},
});

// Create a new invoice
export const createInvoice = mutation({
	args: {
		bill_from_address: v.string(),
		bill_from_city: v.string(),
		bill_from_post_code: v.string(),
		bill_from_country: v.string(),
		client_name: v.string(),
		client_email: v.string(),
		client_address: v.string(),
		client_city: v.string(),
		client_post_code: v.string(),
		client_country: v.string(),
		invoice_date: v.number(),
		payment_terms: v.string(),
		project_description: v.string(),
		status: v.union(v.literal('pending'), v.literal('paid')),
		items: v.array(
			v.object({
				item_name: v.string(),
				qty: v.number(),
				price: v.number(),
			})
		),
	},

	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Not authenticated');
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', (q) =>
				q.eq('tokenIdentifier', identity.tokenIdentifier)
			)
			.unique();

		if (!user) {
			throw new Error('User not found');
		}

		const invoiceId = await ctx.db.insert('invoices', {
			userId: user._id,
			...args,
		});

		return {
			success: true,
			message: 'Invoice created successfully!',
			invoiceId,
		};
	},
});

// Update an invoice
export const updateInvoice = mutation({
	args: {
		id: v.id('invoices'),
		bill_from_address: v.optional(v.string()),
		bill_from_city: v.optional(v.string()),
		bill_from_post_code: v.optional(v.string()),
		bill_from_country: v.optional(v.string()),
		client_name: v.optional(v.string()),
		client_email: v.optional(v.string()),
		client_address: v.optional(v.string()),
		client_city: v.optional(v.string()),
		client_post_code: v.optional(v.string()),
		client_country: v.optional(v.string()),
		invoice_date: v.optional(v.number()),
		payment_terms: v.optional(v.string()),
		project_description: v.optional(v.string()),
		items: v.optional(
			v.array(
				v.object({
					item_name: v.string(),
					qty: v.number(),
					price: v.number(),
				})
			)
		),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Not authenticated - Please sign in to update this invoice');
		}

		const invoice = await ctx.db.get(args.id);
		if (!invoice) {
			throw new Error('Invoice not found - It may have been deleted');
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', (q) =>
				q.eq('tokenIdentifier', identity.tokenIdentifier)
			)
			.unique();

		if (!user || invoice.userId !== user._id) {
			throw new Error(
				"Unauthorized - You don't have permission to update this invoice"
			);
		}

		if (args.items && args.items.length === 0) {
			throw new Error('Invoice must have at least one item');
		}

		const { id, ...updateData } = args;
		await ctx.db.patch(id, updateData);

		return {
			success: true,
			message: 'Invoice updated successfully!',
			invoiceId: id,
		};
	},
});

// Delete an invoice
export const deleteInvoice = mutation({
	args: { id: v.id('invoices') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Not authenticated - Please sign in to delete this invoice');
		}

		const invoice = await ctx.db.get(args.id);
		if (!invoice) {
			throw new Error('Invoice not found - It may have already been deleted');
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', (q) =>
				q.eq('tokenIdentifier', identity.tokenIdentifier)
			)
			.unique();

		if (!user || invoice.userId !== user._id) {
			throw new Error(
				"Unauthorized - You don't have permission to delete this invoice"
			);
		}

		await ctx.db.delete(args.id);

		return {
			success: true,
			message: 'Invoice deleted successfully!',
		};
	},
});

export const updateInvoiceStatus = mutation({
	args: {
		id: v.id('invoices'),
		status: v.union(v.literal('pending'), v.literal('paid')),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Not authenticated');
		}

		const invoice = await ctx.db.get(args.id);
		if (!invoice) {
			throw new Error('Invoice not found');
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', (q) =>
				q.eq('tokenIdentifier', identity.tokenIdentifier)
			)
			.unique();

		if (!user || invoice.userId !== user._id) {
			throw new Error('Unauthorized');
		}

		await ctx.db.patch(args.id, {
			status: args.status,
		});

		return {
			success: true,
			message: `Invoice marked as ${args.status}!`,
		};
	},
});
