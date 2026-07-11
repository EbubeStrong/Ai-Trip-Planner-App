import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCachedPhotoUrl = query({
  args: { hotelName: v.string() },
  handler: async (ctx, args) => {
    const cached = await ctx.db
      .query("PhotoCacheTable")
      .withIndex("by_hotelName", (q) => q.eq("hotelName", args.hotelName))
      .first();
    return cached?.photoUrl ?? null;
  },
});

export const storeCachedPhotoUrl = mutation({
  args: { hotelName: v.string(), photoUrl: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("PhotoCacheTable")
      .withIndex("by_hotelName", (q) => q.eq("hotelName", args.hotelName))
      .first();

    if (!existing) {
      await ctx.db.insert("PhotoCacheTable", {
        hotelName: args.hotelName,
        photoUrl: args.photoUrl,
      });
    }
  },
});
