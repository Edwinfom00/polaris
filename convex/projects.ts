import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { verifyAuth } from "./auth";


export const create = mutation({
    args: {
        name: v.string()
    },
    handler: async (ctx, args) => {

        const identidy = await verifyAuth(ctx);

        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identidy.subject,
            updatedAt: Date.now(),
        })

        return projectId;
    }
});

export const getPartial = query({
    args: {
        limit: v.number()
    },
    handler: async (ctx, args) => {

        const identidy = await verifyAuth(ctx);

        const query = await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identidy.subject))
            .order("desc")
            .take(args.limit);

        return query;
    }
})

export const get = query({
    args: {
    },
    handler: async (ctx) => {

        const identidy = await verifyAuth(ctx);

        const query = await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identidy.subject))
            .order("desc")
            .collect();

        return query;
    }
})