// src/lib/instagram.ts

const GRAPH_API_BASE = `https://graph.instagram.com/v25.0`;

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

// glavna funkcija publishNewsToInstagram, proverava koliko je dobija url slika kao array, i caption, provera da li ima samo jedna slika, ako ima pravi obican post, ako ima vise, carousel
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
    throw new Error("Invalid number of images for carousel post: " + imageUrls.length + ". Instagram allows 1-10 images per post.");
  }
}

async function createSinglePost(
  igUserId: string,
  accessToken: string,
  imageUrl: string,
  caption: string,
  postId: number
) {

  // Creating media object
  const mediaResponse = await fetch(`${GRAPH_API_BASE}/${igUserId}/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      image_url: imageUrl,
      caption: `${caption}\n\n${process.env.SITE_URL}/vesti/${postId}`,
    }),
  });
  const { id: mediaId, error: mediaError } = await mediaResponse.json() as InstagramApiResponse;

  if (mediaError) {
    console.error("Error creating media object:", mediaError);
    throw new Error(`Failed to create media object: ${mediaError.message}`);
  }

  // Posting media object
  const publishResponse = await fetch(`${GRAPH_API_BASE}/${igUserId}/media_publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      creation_id: mediaId,
    }),
  });

  return publishResponse.json() as Promise<InstagramApiResponse>;
  
}
  
async function createCarouselPost(
  igUserId: string,
  accessToken: string,
  imageUrls: string[],
  caption: string,
  postId: number
) {

  console.log("Creating carousel post with images:", imageUrls);

  const mediaIds = await Promise.all(
    imageUrls.map(async (url) => {
      const mediaResponse = await fetch(`${GRAPH_API_BASE}/${igUserId}/media`, {
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

  const carouselResponse = await fetch(`${GRAPH_API_BASE}/${igUserId}/media`, {
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

  const publishCarouselOnce = async () => {
    const publishResponse = await fetch(`${GRAPH_API_BASE}/${igUserId}/media_publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        creation_id: carouselId,
      }),
    });

    return (await publishResponse.json()) as InstagramApiResponse;
  };

  let publishData = await publishCarouselOnce();

  if (publishData.error) {
    console.error("Published carousel post returned error:", publishData.error);

    if (publishData.error.code === 9007) {
      console.warn("Publish failed with code 9007, retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      publishData = await publishCarouselOnce();
    }
  }

  console.log("Published carousel post:", publishData);

  return publishData;
}