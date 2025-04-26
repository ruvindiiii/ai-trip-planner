type Trip = {
  location: string;
  thingsToDo: string[];
  imageUrls: string[];
};

const url = "https://api.deepseek.com/chat/completions";
const key = "sk-e057d1facf9d4356ad892888b0540ac4";
export const getTrips = async (keyWord: string): Trip[] => {
  let body = {
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You are a trip planner. Return a valid JSON array as a single line, with no code blocks, and no newlines. Do not wrap it in triple backticks or specify the language like ```json. Only return valid, parsable JSON",
      },
      {
        role: "user",
        content: keyWord,
      },
    ],
    stream: false,
  };
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  let result = await response.json();
  let content = result.choices[0].message.content;
  if (content.startsWith("```json")) {
    content = content.slice(7);
    content = content.slice(-3);
  }

  console.log(content);
  let trips = JSON.parse(content);
  return trips;
};
