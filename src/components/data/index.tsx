import { MenuOptionsProps, SelectListProps, SuggestionsProps } from "@/types";
import { Globe, Globe2, Landmark, Plane } from "lucide-react";

export const images = [
    // "https://assets.codepen.io/16327/portrait-image-1.jpg",
    // "https://assets.codepen.io/16327/portrait-image-2.jpg",
    // "https://assets.codepen.io/16327/portrait-image-3.jpg",
    // "https://assets.codepen.io/16327/portrait-image-4.jpg",
    // "https://assets.codepen.io/16327/portrait-image-5.jpg",
    // "https://assets.codepen.io/16327/portrait-image-6.jpg",
    // "https://assets.codepen.io/16327/portrait-image-7.jpg",
    // "https://assets.codepen.io/16327/portrait-image-8.jpg",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAlOI5AuOoxizwKZB5U6AOzWJAP8GUjpO-qCH2HTYIpQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsaEqlY9Zch5_j9fGg8eRVS5uoe7wQutdFlnHwiNYkyQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNyEnfHCj1l0_UahwRCjYN7JPeByC60lW9VBlfsPgNg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJnXW-FnuKjqa76VQ6OXl29A_ELAYdPYguzy_-12l5wg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-EX2eEdI9Mj531KSlwrDlx_WqLgPcHPY2FzA1XoMsoQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsIXdeT2JLQcZJJeMonIvGpLQUdkAdJzzwhdMct6vLDg&s=10"
];

export const cities = [
    {
        category: "Paris, France",
        title: "Explore the City of Lights - Eiffel Tower, Louvre Museum, and more",
    },

    {
        category: "Tokyo, Japan",
        title: "Immerse yourself in the Land of the Rising Sun - Traditional Temples, Modern Districts, and more"
    },
    {
        category: "Lagos, Nigeria",
        title: "Discover the Pulse of Africa - Vibrant Markets, Historical Sites, and more"
    },
    {
        category: "London, UK",
        title: "Step into History - British Museum, Tower of London, and more"
    },
    {
        category: "New York, USA",
        title: "Experience the Big Apple - Statue of Liberty, Central Park, and more"
    },
    {
        category: "Rome, Italy",
        title: "Walk Through Ancient History - Colosseum, Vatican City, and more"
    },
].map((city, index) => ({
    ...city,
    src: images[index % images.length],
}))


export const suggestions: SuggestionsProps[] = [
    {
        title: "Create a New Trip",
        icon: <Globe2 className="text-blue-400 h-5 w-5" />,
    },
    {
        title: "Inspire me where to go",
        icon: <Plane className="text-green-500 h-5 w-5" />,
    },
    {
        title: "Discover the best places to visit",
        icon: <Landmark className="text-orange-500 h-5 w-5" />,
    },
    {
        title: "Adventure awaits! Let's plan your next journey",
        icon: <Globe className="text-yellow-600 h-5 w-5" />,
    },
]

export const menuOptions: MenuOptionsProps[] = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Pricing",
        path: "/pricing"
    },
    {
        name: "Contact",
        path: "/contact"
    }
]

export const SelectTravelsList: SelectListProps[] = [
    {
        id: 1,
        title: "Just Me",
        description: "Solo traveler in exploration",
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: "A Couple",
        description: "Two travels for adventure",
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: "Family",
        description: "For Fun family group",
        icon: '👨‍👩‍👦',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: "Friends",
        description: "A bunch of thrill-seekers",
        icon: '🏂',
        people: '5 to 10 people'
    }
]

export const SelectBudgetOptions: SelectListProps[] = [
    {
        id: 1,
        title: "Cheap",
        description: "Stay consious of costs",
        icon: "👌",
        color: "bg-green-100 text-green-600"
    },
    {
        id: 2,
        title: "Moderate",
        description: "Keep cost on the averge side",
        icon: "😊",
        color: "bg-yellow-100 text-yellow-600"
    },
    {
        id: 3,
        title: "Luxury",
        description: "Don't worry about cost",
        icon: "💰",
        color: "bg-purple-100 text-purple-600"
    },
]


export const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time. Also correct any word thats not typed correctly and reply with the correct word and the next appropriate question. If user types in a country first, do not go ahead asking other questions till the user answers the country.
Only ask questions about the following details in order, and wait for the user's answer before asking the next.
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., history, nature, food, adventure, cultural, sightseeing, relaxation, shopping, nightlife, etc.)
7. Special requirements or preferences (if any)
Do not ask multuple questions at once, and never ask irrelevant questions. 
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.Along with your response, return the UI component that should be displayed next.

The "ui" field MUST be exactly ONE of the following values:

- "groupSize" → when asking how many people are traveling.
- "budget" → when asking for the user's budget.
- "tripDuration" → when asking how many days the trip will last.
- "none" → when no special UI component is required and the user should respond using the normal chat input.
- "viewTrip" → when all required information has been collected and you are returning the completed trip plan.

Maintain an internal checklist of:

- source
- destination
- groupSize
- budget
- duration
- interests
- specialRequirements
Rules:

- Before every response, examine the entire conversation.
- Maintain an internal checklist of the required trip information:
  - source
  - destination
  - groupSize
  - budget
  - duration
  - interests
  - specialRequirements
- Extract every piece of trip information the user has already provided, even if it was not in response to your previous question.
- Users may answer questions out of order.
- Never ask for information that has already been provided explicitly or can be clearly inferred from the conversation.
- Accept indirect answers whenever they clearly imply the requested information.
- If a user's answer is ambiguous, politely ask for clarification instead of making assumptions.
- Always respond in a way that is relevant to the user's most recent message.
- Ask exactly one question at a time.
- Always ask for the first missing required field only.
- Do not repeat previously asked questions unless the user did not answer or the answer is genuinely unclear.
- Once all required information has been collected, stop asking questions immediately.
- Generate the complete trip plan and return it.
- After the trip plan has been generated, do not ask any more trip-planning questions. If the user asks follow-up questions or requests modifications, update the existing trip plan instead of starting the interview again.
- Return ONLY a valid JSON object. Do not include markdown, code fences, or explanatory text outside the JSON.

Response schema:

{
  "res": "Text response from the AI Trip Planner Agent",
  "ui": "groupSize | budget | tripDuration | viewTrip"
}
`

export const FINAL_PROMPT = `Generate Travel Plan and give details, give Hotel options list with name, address, price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place image, geo coordinates, ticket pricing, time travel on each of the location, with each day itinerary, and also give a list of restaurants with name, address, price range, restaurant image url, geo coordinates, rating, descriptions, and suggest a list of activities with name, address, price range, activity image url, geo coordinates, rating, descriptions.
The response should be in JSON format with the following structure:
Output Schema:
{
  "res": "A friendly, conversational summary message for the user confirming the trip plan has been generated.",
  "ui": "final",
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "group_size": "string",
    "budget": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`