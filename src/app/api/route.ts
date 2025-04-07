import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request.body);
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
