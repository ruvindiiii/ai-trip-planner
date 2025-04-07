export async function GET() {
  const data = [
    {
      Location: "Amsterdam",
      id: 1,
      thingsToDo:
        "https://www.nytimes.com/interactive/2023/08/31/travel/things-to-do-amsterdam.html",
    },
    {
      Location: "Lake Como",
      id: 2,
      thingsToDo:
        "https://www.cntravellerme.com/story/the-best-things-to-do-in-lake-como",
    },
  ];
  return Response.json(data);
}
