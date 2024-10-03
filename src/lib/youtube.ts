import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "@/lib/gemini";

async function youtubeApiRequest(url: string, attempt = 1) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error: any) {
    if (
      error.response?.status === 403 &&
      error.response?.data?.error?.errors[0]?.reason === "quotaExceeded"
    ) {
      if (attempt === 1) {
        console.log(
          "Primary YouTube API key quota exceeded. Switching to secondary key."
        );
        const newUrl = url.replace(
          process.env.YOUTUBE_API_KEY || "",
          process.env.YOUTUBE_API_KEY2 || ""
        );
        return youtubeApiRequest(newUrl, 2);
      } else {
        console.log("Both YouTube API keys have exceeded their quotas.");
        return null;
      }
    } else {
      console.error("YouTube API error:", error);
      return null;
    }
  }
}

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);
  const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5&videoCaption=closedCaption`;
  const data = await youtubeApiRequest(url);

  if (!data || !data.items || data.items.length === 0) {
    console.log("YouTube search failed");
    return null;
  }
  return data.items[0].id.videoId;
}

export async function getYoutubeDescription(videoId: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=snippet&id=${videoId}`;
  const data = await youtubeApiRequest(url);

  if (!data || !data.items || data.items.length === 0) {
    console.log("Failed to retrieve video description");
    return "No description available";
  }
  return data.items[0].snippet.description;
}

export async function getTranscript(videoId: string) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", " ");
  } catch (error) {
    console.log("Failed to fetch transcript, fetching description instead.");
    return await getYoutubeDescription(videoId);
  }
}

export async function getQuestionsFromTranscript(
  transcript: string,
  course_title: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  const questions: Question[] = await strict_output(
    "You are a helpful AI that is able to generate MCQ questions and answers, the length of each answer should not be more than 15 words and it must not be empty. If you can't generate any, return the reason why you can't generate. You must return the response before continuing, you cannot return blank.",
    new Array(5).fill(
      `You are to generate a random hard MCQ question about ${course_title} with context of the following transcript: ${transcript}`
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    }
  );
  return questions;
}
