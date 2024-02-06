import { query } from "./_generated/server";

export const getRanking = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('ranking').take(100)
    },
});