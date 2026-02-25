import { prisma } from "@/lib/prisma";

export interface NewsDetailResult {
  newsId: number;
  newsHeader: string;
  newsText: string;
  date: string;
  images: { name: string }[];
  message?: string;
}

export interface NewsPaginatedResult {
  data: {
    newsId: number;
    newsHeader: string;
    newsText: string;
    date: string;
    images: { name: string }[];
  }[];
  metadata: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

export async function getNewsDetail(
  id: number
): Promise<NewsDetailResult | null> {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!article) return null;

    return {
      newsId: article.id,
      newsHeader: article.header,
      newsText: article.text,
      date: article.date,
      images: article.images.map((img) => ({ name: img.filename })),
    };
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return null;
  }
}

/**
 * Retrieve up to ten most recent featured news articles, including their images.
 *
 * @returns An array of news items in `NewsDetailResult` shape; returns an empty array if none are found or on error.
 */
export async function getFeaturedNews(): Promise<NewsDetailResult[]> {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: { featured: true },
      include: { images: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return articles.map((article) => ({
      newsId: article.id,
      newsHeader: article.header,
      newsText: article.text,
      date: article.date,
      images: article.images.map((img) => ({ name: img.filename })),
    }));
  } catch (error) {
    console.error("Error fetching featured news:", error);
    return [];
  }
}

/**
 * Fetches the most recent news articles up to the specified limit, including associated images.
 *
 * @param limit - Maximum number of articles to retrieve (defaults to 10)
 * @returns An array of news items each containing `newsId`, `newsHeader`, `newsText`, `date`, and `images` (each image as `{ name: string }`); returns an empty array on error
 */
export async function getLatestNews(limit: number = 10): Promise<NewsDetailResult[]> {
  try {
    const articles = await prisma.newsArticle.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return articles.map((article) => ({
      newsId: article.id,
      newsHeader: article.header,
      newsText: article.text,
      date: article.date,
      images: article.images.map((img) => ({ name: img.filename })),
    }));
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
}

/**
 * Retrieve the most recently created featured news article, including its images.
 *
 * Images are returned as objects with a `name` property (the image filename).
 *
 * @returns `NewsDetailResult` for the latest featured article, or `null` if none is found or an error occurs.
 */
export async function getLatestFeaturedArticle(): Promise<NewsDetailResult | null> {
  try {
    const article = await prisma.newsArticle.findFirst({
      where: { featured: true },
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    if (!article) return null;

    return {
      newsId: article.id,
      newsHeader: article.header,
      newsText: article.text,
      date: article.date,
      images: article.images.map((img) => ({ name: img.filename })),
    };
  } catch (error) {
    console.error("Error fetching latest featured article:", error);
    return null;
  }
}

/**
 * Fetches a page of news articles including their images and pagination metadata.
 *
 * @param page - Zero-based page index to retrieve
 * @param pageSize - Number of articles per page
 * @returns The paginated result containing `data` (news items with id, header, text, date, images) and `metadata` (`totalPages`, `pageSize`, `currentPage`, `totalCount`). On error, returns an empty `data` array and metadata with totals set to `0` while preserving the requested `page` and `pageSize`.
 */
export async function getNewsPaginated(
  page: number = 0,
  pageSize: number = 12
): Promise<NewsPaginatedResult> {
  try {
    const [articles, totalCount] = await Promise.all([
      prisma.newsArticle.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
        skip: page * pageSize,
        take: pageSize,
      }),
      prisma.newsArticle.count(),
    ]);

    return {
      data: articles.map((article) => ({
        newsId: article.id,
        newsHeader: article.header,
        newsText: article.text,
        date: article.date,
        images: article.images.map((img) => ({ name: img.filename })),
      })),
      metadata: {
        totalPages: Math.ceil(totalCount / pageSize),
        pageSize,
        currentPage: page,
        totalCount,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated news:", error);
    return {
      data: [],
      metadata: {
        totalPages: 0,
        pageSize,
        currentPage: page,
        totalCount: 0,
      },
    };
  }
}
