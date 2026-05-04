// src/lib/instagram.ts

const GRAPH_API_VERSION = "v20.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

type InstagramApiError = {
  message: string;
  type?: string;
  code?: number;
  error_subcode?: number;
};

type InstagramApiResponse = {
  id?: string;
  error?: InstagramApiError;
};

function getInstagramConfig() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_IG_USER_ID;

  if (!accessToken) {
    throw new Error("Missing INSTAGRAM_ACCESS_TOKEN");
  }

  if (!igUserId) {
    throw new Error("Missing INSTAGRAM_IG_USER_ID");
  }

  return { accessToken, igUserId };
}

function getRequiredId(data: InstagramApiResponse, context: string) {
  if (data.error) {
    throw new Error(`${context}: ${data.error.message}`);
  }

  if (!data.id) {
    throw new Error(`${context}: Instagram did not return an id`);
  }

  return data.id;
}

export async function createInstagramImageContainer(params: {
  imageUrl: string;
  caption?: string;
  isCarouselItem?: boolean;
}) {
  const { accessToken, igUserId } = getInstagramConfig();

  const body = new URLSearchParams({
    image_url: params.imageUrl,
    access_token: accessToken,
  });

  if (params.caption && !params.isCarouselItem) {
    body.set("caption", params.caption);
  }

  if (params.isCarouselItem) {
    body.set("is_carousel_item", "true");
  }

  const response = await fetch(`${GRAPH_API_BASE}/${igUserId}/media`, {
    method: "POST",
    body,
  });

  const data = (await response.json()) as InstagramApiResponse;

  return getRequiredId(data, "Failed to create Instagram image container");
}

export async function createInstagramCarouselContainer(params: {
  childContainerIds: string[];
  caption: string;
}) {
  const { accessToken, igUserId } = getInstagramConfig();

  const body = new URLSearchParams({
    media_type: "CAROUSEL",
    children: params.childContainerIds.join(","),
    caption: params.caption,
    access_token: accessToken,
  });

  const response = await fetch(`${GRAPH_API_BASE}/${igUserId}/media`, {
    method: "POST",
    body,
  });

  const data = (await response.json()) as InstagramApiResponse;

  return getRequiredId(data, "Failed to create Instagram carousel container");
}

export async function publishInstagramContainer(creationId: string) {
  const { accessToken, igUserId } = getInstagramConfig();

  const body = new URLSearchParams({
    creation_id: creationId,
    access_token: accessToken,
  });

  const response = await fetch(`${GRAPH_API_BASE}/${igUserId}/media_publish`, {
    method: "POST",
    body,
  });

  const data = (await response.json()) as InstagramApiResponse;

  return getRequiredId(data, "Failed to publish Instagram container");
}

export async function publishNewsToInstagram(params: {
  imageUrls: string[];
  caption: string;
}) {
  if (params.imageUrls.length === 0) {
    throw new Error("Instagram post requires at least one image");
  }

  if (params.imageUrls.length === 1) {
    const containerId = await createInstagramImageContainer({
      imageUrl: params.imageUrls[0],
      caption: params.caption,
    });

    const postId = await publishInstagramContainer(containerId);

    return {
      type: "single" as const,
      containerId,
      postId,
    };
  }

  const childContainerIds: string[] = [];

  for (const imageUrl of params.imageUrls) {
    const childContainerId = await createInstagramImageContainer({
      imageUrl,
      isCarouselItem: true,
    });

    childContainerIds.push(childContainerId);
  }

  const carouselContainerId = await createInstagramCarouselContainer({
    childContainerIds,
    caption: params.caption,
  });

  const postId = await publishInstagramContainer(carouselContainerId);

  return {
    type: "carousel" as const,
    childContainerIds,
    containerId: carouselContainerId,
    postId,
  };
}