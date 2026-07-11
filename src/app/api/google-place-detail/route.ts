import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { placeName } = await req.json();

  try {
    /**
     * -------------------------
     * STEP 1
     * Search Google Place
     * -------------------------
     */

    const searchResult = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: placeName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_PLACE_API_KEY,
          "X-Goog-FieldMask": "places.id",
        },
      }
    );

    const place = searchResult.data.places?.[0];

    if (!place) {
      return NextResponse.json(
        {
          success: false,
          message: "Place not found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * -------------------------
     * STEP 2
     * Get Google Details
     * -------------------------
     */

    let googleData = {};

    try {
      const detailResult = await axios.get(
        `https://places.googleapis.com/v1/places/${place.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.GOOGLE_PLACE_API_KEY,
            "X-Goog-FieldMask":
              "displayName,formattedAddress,location,rating,userRatingCount,googleMapsLinks",
          },
        }
      );

      googleData = detailResult.data;
    } catch (googleErr) {
      const err = googleErr as { response?: { status?: number; data?: { error?: { status?: string } } } };

      if (
        err.response?.status === 429 ||
        err.response?.data?.error?.status === "RESOURCE_EXHAUSTED"
      ) {
        console.log("Google quota exceeded.");

        googleData = {
          quotaExceeded: true,
        };
      } else {
        throw googleErr;
      }
    }

    /**
     * -------------------------
     * STEP 3
     * Get Pexels Image
     * -------------------------
     */

    let image = "";

    try {
      const pexels = await axios.get(
        "https://api.pexels.com/v1/search",
        {
          params: {
            query: placeName,
            per_page: 1,
          },
          headers: {
            Authorization: process.env.PEXELS_API_KEY!,
          },
        }
      );

      image =
        pexels.data.photos?.[0]?.src?.large ??
        pexels.data.photos?.[0]?.src?.medium ??
        "";
    } catch (error) {
      console.log("Pexels Error", error);
    }

    /**
     * -------------------------
     * STEP 4
     * Return everything
     * -------------------------
     */

    return NextResponse.json({
      success: true,

      image,

      google: googleData,
    });
  } catch (err) {
    const error = err as { response?: { data?: unknown; status?: number }; message?: string };
    console.log(error.response?.data);

    return NextResponse.json(
      {
        success: false,
        error: error.response?.data ?? error.message,
      },
      {
        status: error.response?.status ?? 500,
      }
    );
  }
}
