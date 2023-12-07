import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
      await connectToDB();
  
      const currentPosts = await Prompt.find({}).populate('creator');
      
      // console.log("The data that fetch is : " + currentPosts)

      return new Response(JSON.stringify(currentPosts),{status:200})
  
    } catch (error) {
      return new Response("Failed to get the prompts", { status: 500 });
  
    }
  }