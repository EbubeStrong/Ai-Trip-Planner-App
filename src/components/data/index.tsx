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


export const suggestions = [
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

export const menuOptions = [
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

export const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next.
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., history, nature, food, adventure, cultural, sightseeing, relaxation, shopping, nightlife, etc.)
7. Special requirements or preferences (if any)
Do not ask multuple questions at once, and never sk irrelevant questions. 
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along with response also send which ui component to disply for generative UI for example 'budget/groupSize/tripDuration/final), where Final means AI generated trip plan to display.
Once all required information is collected, generate and return a strict JSON response only (no explanations or additional text) with following JSON schema:
{
res: "Text Response from AI Trip Planner Agent",
ui: "budget/groupSize/tripDuration/final)"
}
`