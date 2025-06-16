export const REQUEST_CONFIG = {
    BASE_URL: "https://wpu-cafe.vercel.app",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
    },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
    const endpoint = query
        ? `${REQUEST_CONFIG.BASE_URL}/api/menu${query?.toString()}`
        : `${REQUEST_CONFIG.BASE_URL}/api/menu`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: REQUEST_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Fetched movies:", data.data);

    return data.data;
};
