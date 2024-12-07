import dbConnect from "@/db";
import PostItem from "@/models/postItem";

// Connect to database before handling requests
await dbConnect();

export async function GET() {
  try {
    const postItems = await PostItem.find().select("-__v");
    return Response.json(postItems);
  } catch (error) {
    return Response.json({ message: "SERVER ERROR" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const postItem = await request.json();
    const savedItem = await PostItem.create(postItem);
    return Response.json(savedItem, { status: 201 });
  } catch (error) {
    return Response.json({ message: "SERVER ERROR" }, { status: 500 });
  }
}