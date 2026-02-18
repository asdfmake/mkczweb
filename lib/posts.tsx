import { NewsDetail } from "@/app/[locale]/vesti/[id]/page";

export async function getNewsDetail(id: number): Promise<NewsDetail | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND}api/getNewsDetail?id=${id}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return null;
  }
}

let featuredNews: NewsDetail[] | null = null;
let lastFetchTime = null;

async function fetchFeaturedNews() {
  try {
    const response = await fetch(`${process.env.BACKEND}api/getFeaturedNews`);

    const data = await response.json();
    featuredNews = data;
    lastFetchTime = Date.now();
  } catch (error) {
    console.error("Error fetching featured news:", error);
  }
}
// Fetch data immediately when the server starts
fetchFeaturedNews();

// Refresh data every hour (3600000 milliseconds)
setInterval(fetchFeaturedNews, 3600000);

export const getFeaturedNews = () => {
  return featuredNews;
};
