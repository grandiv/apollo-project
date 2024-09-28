import axios from "axios";

export const getUnsplashImage = async (query: string) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&per_page=1&query=${query}`
  );
  return data.results[0].urls.small_s3;
};
