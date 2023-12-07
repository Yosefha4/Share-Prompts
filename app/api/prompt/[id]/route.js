import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const currentPost = await Prompt.findById(params.id).populate("creator");

    if (!currentPost) return new Response("Prompt not found", { status: 404 });
    // console.log("The data that fetch is : " + currentPosts)

    return new Response(JSON.stringify(currentPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to get the prompts", { status: 500 });
  }
};

//Patch (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// Delete
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        
       await Prompt.findByIdAndDelete(params.id);
        // if (!prompToDelete)
        // return new Response("Prompt not found", { status: 404 });

        // await Prompt.deleteOne({id:params.id})

        return new Response("Prompt deleted .", { status: 200 });

    } catch (err) {
        return new Response("Failed to delete", { status: 500 });

    }
}
