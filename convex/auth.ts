import { MutationCtx, QueryCtx } from "./_generated/server";

export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
    const identidy = await ctx.auth.getUserIdentity();

    if (!identidy) {
        throw new Error("Unauthorized")
    }

    return identidy
}