import { query } from "./_generated/server";

export const getImageList = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('images').take(100)
    },
});