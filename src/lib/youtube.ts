import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "@/lib/gemini";

// searchYoutube function will return the video ID based on the relevant YouTube query
export async function searchYoutube(searchQuery: string) {
  // hello world -> hello+world
  searchQuery = encodeURIComponent(searchQuery);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5&videoCaption=closedCaption`
  );
  if (!data) {
    console.log("YouTube failed");
    return null;
  }
  if (data.items[0] == undefined) {
    console.log("YouTube failed");
    return null;
  }
  return data.items[0].id.videoId;
}

// return the full transcript of the video ID
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
    return "";
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
