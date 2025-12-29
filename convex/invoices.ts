import { query } from './_generated/server';

export const getInvoices = query({
	args: {},
	handler: async (ctx) => {
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

		return await ctx.db
			.query('invoices')
			.withIndex('by_user', (q) => q.eq('userId', user._id))
			.collect();
	},
});
