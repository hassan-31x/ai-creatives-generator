"use server"

// Mimic AI creative generation with a delay and return dummy result
export async function submitProductAction(formData: FormData) {
  // Simulate processing delay (e.g., 3 seconds)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Extract product name for dummy result
  const productName = formData.get("productName") || "Product";

  // Return dummy creative result with different social media formats
  return {
    success: true,
    creatives: [
      {
        type: "instagram_story",
        title: "Instagram Story",
        imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
        dimensions: "1080 × 1920"
      },
      {
        type: "instagram_post",
        title: "Instagram Post",
        imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
        dimensions: "1080 × 1080"
      },
      {
        type: "facebook_post",
        title: "Facebook Post",
        imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432",
        dimensions: "1200 × 630"
      },
      {
        type: "linkedin_post",
        title: "LinkedIn Post",
        imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603",
        dimensions: "1200 × 627"
      },
      {
        type: "twitter_post",
        title: "Twitter Post",
        imageUrl: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
        dimensions: "1600 × 900"
      },
      {
        type: "website_banner",
        title: "Website Banner",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
        dimensions: "1200 × 400"
      }
    ]
  };
}
