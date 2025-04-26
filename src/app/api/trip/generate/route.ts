import client from "../../../lib/mongodb";
import { getTrips } from "@/app/lib/openAi";
import { getImages } from "@/app/lib/pexels";
import { ObjectId } from "mongodb";

export async function GET() {
  await client.connect();
  const db = client.db("trip-planner");
  const collection = db.collection("trips");
  let trips = await collection.find().toArray();

  if (!trips.length) {
    let openAiTrips = await getTrips(
      "Give me a json array of 6 elements with a trip object. That has keys - title, location and things to do (string array)"
    );
    await collection.insertMany(openAiTrips);
  }

  trips = await collection.find().toArray();
  console.log(trips);

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

  trips = await collection.find().toArray();

  return Response.json(trips);
}
