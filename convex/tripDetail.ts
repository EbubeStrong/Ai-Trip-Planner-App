import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createTripDetail = mutation({
  args: {
    tripId: v.string(),
    tripDetail: v.object({
      origin: v.string(),
      destination: v.string(),
      duration: v.string(),
      budget: v.string(),
      groupSize: v.string(),
      hotels: v.array(v.string()),
      itinerary: v.array(v.string()),
      activities: v.optional(v.array(v.string())),
    }),
    userId: v.id("UserTable"),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.insert("TripDetailTable", {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      userId: args.userId,
    });
    return result;
  },
});
