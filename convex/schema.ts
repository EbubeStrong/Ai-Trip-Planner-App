import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),
  }),

  TripDetailTable: defineTable({
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
  }),

  PhotoCacheTable: defineTable({
    hotelName: v.string(),
    photoUrl: v.string(),
  }).index("by_hotelName", ["hotelName"]),
});
