import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    pokemon: defineTable({
        a: v.number(),
        b: v.number(),
        c: v.number(),
        d: v.number(),
        h: v.number(),
        s: v.number(),
        img: v.string(),
        name: v.string()
    }).searchIndex("search_name", {
        searchField: "name"
    })
});