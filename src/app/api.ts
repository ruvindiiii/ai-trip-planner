const authKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

export const getOptions = async (text: string) => {
  let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${authKey}`;
  let response = await fetch(url, {
    method: "GET",
  });
  let result = await response.json();
  return result;
};

export const generateTrip = async (vibes: string[]) => {
  console.log(vibes);
  let url = "http://localhost:3000/api/trip/generate";
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vibesArr: vibes }),
  });
  let result = await response.json();
  return result;
};
