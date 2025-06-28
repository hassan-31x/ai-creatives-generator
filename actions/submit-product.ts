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
          "assetType": "Instagram Post",
          "backgroundTone": "soft blush gradient",
          "surfaceType": "satin draped cloth",
          "accentProp": "gold-trimmed ribbon",
          "lighting": "warm spotlight from the side",
          "cameraAngle": "45-degree angle",
          "overlayText": "Glow deeper. Shine brighter."
        },
        {
          "assetType": "Instagram Story",
          "backgroundTone": "pale lavender with light streaks",
          "surfaceType": "textured ceramic tray",
          "accentProp": "scattered rose petals",
          "lighting": "top-down diffused glow",
          "cameraAngle": "zoomed-in overhead view",
          "overlayText": "Hydration you can feel. Right now."
        },
        {
          "assetType": "Website Banner",
          "backgroundTone": "muted green stone texture",
          "surfaceType": "brushed concrete slab",
          "accentProp": "eucalyptus branch",
          "lighting": "soft angled morning light",
          "cameraAngle": "side-profile landscape",
          "overlayText": "Glow like never before!"
        },
        {
          "assetType": "Ad Creative",
          "backgroundTone": "deep emerald with gradient fade",
          "surfaceType": "reflective glass base",
          "accentProp": "frosted crystal orb",
          "lighting": "dramatic backlight",
          "cameraAngle": "elevated 3/4 angle",
          "overlayText": "10% Off Today Only"
        },
        {
          "assetType": "Testimonial Graphic",
          "backgroundTone": "cream linen with subtle shadows",
          "surfaceType": "polished marble",
          "accentProp": "single white tulip",
          "lighting": "natural side lighting",
          "cameraAngle": "clean straight-on view",
          "overlayText": "My skin has never felt this good."
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
