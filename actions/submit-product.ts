"use server"

import { generateCreativeAssets, CreativeAssetsResponse } from "@/utils/generateCreativeAssets";

// Server action to handle product submission and generate AI creatives
export async function submitProductAction(formData: FormData) {
  try {
    // Extract all form data
    const productName = formData.get("productName") as string || "";
    const productTagline = formData.get("productTagline") as string || "";
    const productCategory = formData.get("productCategory") as string || "";
    const highlightedBenefit = formData.get("highlightedBenefit") as string || "";
    const productDescription = formData.get("productDescription") as string || "";
    
    // Advanced fields
    const brandName = formData.get("brandName") as string || "LUMISÉRA";
    const brandTone = formData.get("brandTone") as string || "Luxury skincare — clean, calm, and elegant.";
    const colorTheme = formData.get("colorTheme") as string || "";
    const backgroundStyle = formData.get("backgroundStyle") as string || "";
    const lightingStyle = formData.get("lightingStyle") as string || "";
    const productPlacement = formData.get("productPlacement") as string || "";
    const typographyStyle = formData.get("typographyStyle") as string || "";
    const compositionGuidelines = formData.get("compositionGuidelines") as string || "";

    // Extract product image if available
    const productImage = formData.get("productImage") as File | null;
    
    console.log("Form data received:", {
      productName,
      productTagline,
      productCategory,
      highlightedBenefit,
      brandName,
      brandTone,
      hasImage: !!productImage
    });

    // Generate creative assets using OpenAI
    // const creativeAssets = await generateCreativeAssets({
    //   productName,
    //   productTagline,
    //   brandName,
    //   brandTone,
    //   productCategory,
    //   highlightedBenefit
    // });

    // Log the generated assets
    // console.log("Generated creative assets:", JSON.stringify(creativeAssets, null, 2));

    const creativeAssets = {
      "assets": [
        {
          assetType: 'Instagram Post',
          backgroundTone: 'rich midnight blue',
          surfaceType: 'polished black marble',
          accentProp: 'gold gaming controller',
          lighting: 'soft spotlight with a halo effect',
          cameraAngle: 'angled top-down view',
          overlayText: 'Experience the pinnacle of play.'
        },
        {
          assetType: 'Instagram Story',
          backgroundTone: 'deep royal purple',
          surfaceType: 'velvet texture',
          accentProp: 'silver coin stack',
          lighting: 'intimate, focused beam',
          cameraAngle: 'close-up, macro shot',
          overlayText: 'Unlock the luxury of gaming.'
        },
        {
          assetType: 'Website Banner',
          backgroundTone: 'subtle ivory gradient',
          surfaceType: 'sleek glass panel',
          accentProp: 'minimalistic geometric sculpture',
          lighting: 'soft ambient glow',
          cameraAngle: 'wide-angle panoramic',
          overlayText: 'Elevate your entertainment.'
        },
        {
          assetType: 'Ad Creative',
          backgroundTone: 'dramatic charcoal grey',
          surfaceType: 'glossy black acrylic',
          accentProp: 'luxurious deep red silk',
          lighting: 'intense side light with contrast',
          cameraAngle: 'dynamic 3/4 perspective',
          overlayText: 'Indulge in Gaming Elegance.'
        },
        {
          assetType: 'Testimonial Graphic',
          backgroundTone: 'soft, warm beige',
          surfaceType: 'smooth sandstone',
          accentProp: 'delicate white orchid',
          lighting: 'gentle natural illumination',
          cameraAngle: 'calm eye-level view',
          overlayText: 'Transform your leisure time.'
        }
      ]
    }

    // For now, return a combination of the OpenAI response and dummy image URLs
    return {
      success: true,
      creatives: [
        {
          type: "instagram_story",
          title: "Instagram Story",
          imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
          dimensions: "1080 × 1920",
          assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Instagram Story")
        },
        {
          type: "instagram_post",
          title: "Instagram Post",
          imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
          dimensions: "1080 × 1080",
          assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Instagram Post")
        },
        {
          type: "facebook_post",
          title: "Facebook Post",
          imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432",
          dimensions: "1200 × 630",
          assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Ad Creative")
        },
        {
          type: "linkedin_post",
          title: "LinkedIn Post",
          imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603",
          dimensions: "1200 × 627",
          assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Testimonial Graphic")
        },
        {
          type: "website_banner",
          title: "Website Banner",
          imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
          dimensions: "1200 × 400",
          assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Website Banner")
        }
      ]
    };
  } catch (error) {
    console.error("Error in submitProductAction:", error);
    return {
      success: false,
      error: "Failed to generate creative assets. Please try again."
    };
  }
}
