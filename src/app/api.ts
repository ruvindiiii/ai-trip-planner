const authKey = "AIzaSyBoXKzYQzn8jA--b-wqy0iTUVHySFiwQ8s";

export const getOptions = async (text: string) => {
  let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${authKey}`;
  let response = await fetch(url, {
    method: "GET",
  });
  let result = await response.json();
  return result;
};
