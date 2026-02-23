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
