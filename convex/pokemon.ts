import { query } from "./_generated/server";
import { v } from "convex/values";

export const getList = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("pokemon").collect();
    },
});

export const seearchList = query({
    args: { name: v.string() },
    handler: async (ctx, { name }) => {
        return await ctx.db.query("pokemon").withSearchIndex('search_name', (q) => {
            return q.search('name', name)
        }).take(100)
    },
})