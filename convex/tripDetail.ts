import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const GetTripById = query({
  args: {
    tripId: v.id('TripDetailTable')
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.tripId)
    if (!trip) return null

    const hotels = trip.tripDetail.hotels.map((hotelStr) => {
      try { return JSON.parse(hotelStr) } catch { return null }
    }).filter(Boolean)

    const itinerary = trip.tripDetail.itinerary.map((dayStr) => {
      try { return JSON.parse(dayStr) } catch { return null }
    }).filter(Boolean)

    const activities = trip.tripDetail.activities?.map((actStr) => {
      try { return JSON.parse(actStr) } catch { return null }
    }).filter(Boolean)

    return {
      ...trip,
      tripDetail: {
        ...trip.tripDetail,
        hotels,
        itinerary,
        activities,
      }
    }
  }
})

export const GetUserTrips = query({
  args: {
    userId: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('TripDetailTable')
    .filter(q => q.eq(q.field('userId'), args.userId))
    .order('desc')
    .collect()

    return Promise.all(result.map(async (trip) => {
      let coverImage = '/assets/movie-app.jpg'
      const hotelImages: string[] = []

      for (const hotelStr of trip.tripDetail.hotels) {
        try {
          const hotel = JSON.parse(hotelStr)
          const cached = await ctx.db.query('PhotoCacheTable')
            .withIndex('by_hotelName', q => q.eq('hotelName', hotel.hotel_name))
            .first()
          const photoUrl = cached?.photoUrl || hotel?.hotel_image_url || '/assets/movie-app.jpg'
          hotelImages.push(photoUrl)
        } catch {
          hotelImages.push('/assets/movie-app.jpg')
        }
      }

      if (hotelImages.length > 0) coverImage = hotelImages[0]

      return { ...trip, coverImage, hotelImages }
    }))
  }
})