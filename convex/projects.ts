import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const create = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {

        const identidy = await ctx.auth.getUserIdentity();

        if (!identidy) {
            throw new Error("Unauthorized")
        }

        await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identidy.subject,
        })
    }
});

export const get = query({
    args: {},
    handler: async (ctx) => {

        const identidy = await ctx.auth.getUserIdentity();

        if (!identidy) {
            return [];
        }

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identidy.subject))
            .collect();

    }
})