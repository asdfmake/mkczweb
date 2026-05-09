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

// usage:   const { accessToken, igUserId } = getInstagramConfig();

  // then: 
  // const response = await fetch(`${GRAPH_API_BASE}/${igUserId}/media`, {
  //   method: "POST",
  //   body,
  // });
  //const data = (await response.json()) as InstagramApiResponse;
  
function getInstagramConfig() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const igUserId = process.env.INSTAGRAM_IG_USER_ID?.trim();

  if (!accessToken) {
    throw new Error("Missing INSTAGRAM_ACCESS_TOKEN");
  }

  if (!igUserId) {
    throw new Error("Missing INSTAGRAM_IG_USER_ID");
  }

  return { accessToken, igUserId };
}

// glavna funkcija postToInstagram, proverava koliko je dobija url slika kao array, i caption, provera da li ima samo jedna slika, ako ima pravi obican post, ako ima vise, carousel
// pomocne funkcije, create carousel, create single post
// za captione, salji sta god da je na sajtu upisano i onda na kraju dodaj $ENV.url/vesti/$POST_ID

export async function publishNewsToInstagram(
  imageUrls: string[],
  caption: string,
  postId: number
): Promise<InstagramApiResponse> {
  const { accessToken, igUserId } = getInstagramConfig();

  console.log(imageUrls, caption, postId);

  if (imageUrls.length === 1) {
    return await createSinglePost(igUserId, accessToken, imageUrls[0], caption, postId);
  } else if (imageUrls.length > 1 && imageUrls.length <= 10) {
    return await createCarouselPost(igUserId, accessToken, imageUrls, caption, postId);
  } else {
    throw new Error("Invalid number of images for carousel post");
  }
}

async function createSinglePost(
  igUserId: string,
  accessToken: string,
  imageUrl: string,
  caption: string,
  postId: number
) {
  //Create single media post
  return {id: "single post creation logic here"}; // implementacija logike za kreiranje single posta
}
  
async function createCarouselPost(
  igUserId: string,
  accessToken: string,
  imageUrls: string[],
  caption: string,
  postId: number
) {

  // Using temp images for testing
  imageUrls = [
    "https://picsum.photos/1080/1080?random=1",
    "https://picsum.photos/1080/1080?random=2",
    "https://picsum.photos/1080/1080?random=3",
  ];

  console.log("Creating carousel post with images:", imageUrls);

  const mediaIds = await Promise.all(
    imageUrls.map(async (url) => {
      const mediaResponse = await fetch(`https://graph.instagram.com/v25.0/${igUserId}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          image_url: url,
          is_carousel_item: true,
        }),
      });

      const { id } = await mediaResponse.json();

      console.log("Created media object with ID:", id);

      return id;
    })
  );

  console.log("Created media objects with IDs:", mediaIds);

  const carouselResponse = await fetch(`https://graph.instagram.com/v25.0/${igUserId}/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      caption: `${caption}\n\n${process.env.SITE_URL}/vesti/${postId}`,
      media_type: "CAROUSEL",
      children: mediaIds,
    }),
  });

  const { id: carouselId } = await carouselResponse.json();

  console.log("Created carousel post with ID:", carouselId);

  const publishResponse = await fetch(`https://graph.instagram.com/v25.0/${igUserId}/media_publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      creation_id: carouselId,
    }),
  });

  const publishData = await publishResponse.json();

  console.log("Published carousel post:", publishData);

  return publishData;
}