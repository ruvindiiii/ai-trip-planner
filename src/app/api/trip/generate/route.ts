import client from "../../../lib/mongodb";
import { getTrips } from "@/app/lib/openAi";
import { getImages } from "@/app/lib/pexels";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const body = await request.json();
  const bodyString = body.vibesArr.join(",");
  console.log(bodyString);
  await client.connect();
  const db = client.db("trip-planner");
  const collection = db.collection("trips");
  let trips = await collection
    .find({ themes: { $in: body.vibesArr } })
    .toArray();

  console.log(trips);

  if (!trips.length) {
    let openAiTrips = await getTrips(
      `Give me a json array of 6 elements with a trip object. That has keys - title, location themes (string array), and things to do (string array). the trips should be within these themes - ${bodyString}`
    );
    await collection.insertMany(openAiTrips);
  }

  trips = await collection.find({ themes: { $in: body.vibesArr } }).toArray();

  let tripsWithoutImgUrl = trips.filter((trip) => !trip.imageUrls);

  if (!tripsWithoutImgUrl.length) {
    return Response.json(trips);
  }

  for (let i = 0; i < tripsWithoutImgUrl.length; i++) {
    let images = await getImages(tripsWithoutImgUrl[i].title);
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(tripsWithoutImgUrl[i]._id) },
      { $set: { imageUrls: images } }
    );
    console.log(updateResult);
  }

  trips = await collection.find({ themes: { $in: body.vibesArr } }).toArray();

  return Response.json(trips);
}
