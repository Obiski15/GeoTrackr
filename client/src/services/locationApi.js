import { getLocale } from "../utils/helpers";

const REVERSE_GEOCODE_API_KEY = import.meta.env.VITE_REVERSE_GEOCODE_API_KEY;
const FORWARD_GEOCODE_API_KEY = import.meta.env.VITE_FORWARD_GEOCODE_API_KEY;

export async function getUserLocation([lat, lng]) {
  const res = await fetch(
    `https://api-bdc.net/data/reverse-geocode-with-timezone?latitude=${lat}&longitude=${lng}&localityLanguage=${getLocale()}&key=${REVERSE_GEOCODE_API_KEY}`
  );

  if (!res.ok) throw new Error("An Error occured trying to fetch location");

  const data = await res.json();

  return data;
}

export async function searchLocation(text) {
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      text
    )}&apiKey=${FORWARD_GEOCODE_API_KEY}`
  );

  if (!res.ok) throw new Error("unable to get that location");

  const data = await res.json();

  return data;
}
