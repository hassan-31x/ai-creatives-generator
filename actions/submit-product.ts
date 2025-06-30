"use server"

import { db } from "@/lib/db";
import { generateCreativeAssets, CreativeAssetsResponse } from "@/utils/generateCreativeAssets";
import { generateImages, GeneratedImage } from "@/utils/generateImages";
import { getUserByEmail, getUserById } from "@/utils/user";

// Server action to handle product submission and generate AI creatives
export async function submitProductAction(formData: FormData) {
  try {

    const user = await getUserById(formData.get("userId") as string)

    if (!user) {
      return { error: "User not found" }
    }

    console.log("User:", user);

    if (user.generatedImages >= 1) {
      return { error: "You have reached the maximum number of generated images" }
    }

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

    // Prepare product data object to pass to image generation
    const productData = {
      productName,
      productTagline,
      brandName,
      brandTone,
      productCategory,
      highlightedBenefit,
      colorTheme,
      backgroundStyle,
      lightingStyle,
      productPlacement,
      typographyStyle,
      compositionGuidelines
    };

    // Step 1: Generate creative assets using OpenAI
    let creativeAssets;
    
    // creativeAssets = {
    //   assets: [
    //     {
    //       assetType: 'Instagram Post',
    //       backgroundTone: 'rich midnight blue',
    //       surfaceType: 'polished black marble',
    //       accentProp: 'gold gaming controller',
    //       lighting: 'soft spotlight with a halo effect',
    //       cameraAngle: 'angled top-down view',
    //       overlayText: 'Experience the pinnacle of play.'
    //     },
    //     {
    //       assetType: 'Instagram Story',
    //       backgroundTone: 'deep royal purple',
    //       surfaceType: 'velvet texture',
    //       accentProp: 'silver coin stack',
    //       lighting: 'intimate, focused beam',
    //       cameraAngle: 'close-up, macro shot',
    //       overlayText: 'Unlock the luxury of gaming.'
    //     },
    //     {
    //       assetType: 'Website Banner',
    //       backgroundTone: 'subtle ivory gradient',
    //       surfaceType: 'sleek glass panel',
    //       accentProp: 'minimalistic geometric sculpture',
    //       lighting: 'soft ambient glow',
    //       cameraAngle: 'wide-angle panoramic',
    //       overlayText: 'Elevate your entertainment.'
    //     },
    //     {
    //       assetType: 'Ad Creative',
    //       backgroundTone: 'dramatic charcoal grey',
    //       surfaceType: 'glossy black acrylic',
    //       accentProp: 'luxurious deep red silk',
    //       lighting: 'intense side light with contrast',
    //       cameraAngle: 'dynamic 3/4 perspective',
    //       overlayText: 'Indulge in Gaming Elegance.'
    //     },
    //     {
    //       assetType: 'Testimonial Graphic',
    //       backgroundTone: 'soft, warm beige',
    //       surfaceType: 'smooth sandstone',
    //       accentProp: 'delicate white orchid',
    //       lighting: 'gentle natural illumination',
    //       cameraAngle: 'calm eye-level view',
    //       overlayText: 'Transform your leisure time.'
    //     }
    //   ]
    // };

    // Generate real creative assets using OpenAI
    creativeAssets = await generateCreativeAssets({
      productName,
      productTagline,
      brandName,
      brandTone,
      productCategory,
      highlightedBenefit
    });
    
    // Log the generated assets
    console.log("Generated creative assets:", JSON.stringify(creativeAssets, null, 2));

    // Step 2: Generate images based on the creative assets
    const generatedImages = await generateImages(creativeAssets, productData, productImage);

    // Save submission in DB
    const submission = await db.submission.create({
      data: {
        userId: user.id,
        productName,
        productTagline,
        productCategory,
        highlightedBenefit,
        productDescription,
        brandName,
        brandTone,
        colorTheme,
        backgroundStyle,
        lightingStyle,
        productPlacement,
        typographyStyle,
        compositionGuidelines,
        originalImage: generatedImages.find(img => img.type === 'product')?.imageUrl || '',
        instagramPostImage: generatedImages.find(img => img.type === 'instagram_post')?.imageUrl || '',
        instagramStoryImage: generatedImages.find(img => img.type === 'instagram_story')?.imageUrl || '',
        facebookPostImage: generatedImages.find(img => img.type === 'facebook_post')?.imageUrl || '',
        linkedinPostImage: generatedImages.find(img => img.type === 'linkedin_post')?.imageUrl || '',
        websiteBannerImage: generatedImages.find(img => img.type === 'website_banner')?.imageUrl || '',
      }
    });

    await db.user.update({
      where: { id: user.id },
      data: { generatedImages: { increment: 1 } }
    });
    
    // Return the generated images and submission id to the frontend
    return {
      success: true,
      creatives: generatedImages,
      submissionId: submission.id
    };
  } catch (error) {
    console.error("Error in submitProductAction:", error);
    return {
      success: false,
      error: "Failed to generate creative assets. Please try again."
    };
  }
}
