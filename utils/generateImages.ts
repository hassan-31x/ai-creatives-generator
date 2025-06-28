import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { imagePrompts, fallbackPrompt } from './imagePrompts';
import { CreativeAssetsResponse } from './generateCreativeAssets';

// Define the type for the image generation result
export interface GeneratedImage {
  type: string;
  title: string;
  imageUrl: string;
  dimensions: string;
  assetDetails: any;
}

/**
 * Generate images based on creative assets using OpenAI API
 */
export async function generateImages(
  creativeAssets: CreativeAssetsResponse, 
  productData: any = {},
  productImage?: File | null
): Promise<GeneratedImage[]> {
  try {
    console.log("Generating images from creative assets...");
    
    // Make sure the generated-images directory exists
    const imagesDir = path.join(process.cwd(), 'public', 'generated-images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Map asset types to our frontend image types
    const assetTypeMapping: { [key: string]: { type: string, dimensions: string } } = {
      "Instagram Post": { type: "instagram_post", dimensions: "1080 × 1080" },
      "Instagram Story": { type: "instagram_story", dimensions: "1080 × 1920" },
      "Website Banner": { type: "website_banner", dimensions: "1200 × 400" },
      "Ad Creative": { type: "facebook_post", dimensions: "1200 × 630" },
      "Testimonial Graphic": { type: "linkedin_post", dimensions: "1200 × 627" }
    };
    
    // Save product image if available
    let productImagePath = '';
    if (productImage && productImage instanceof File) {
      productImagePath = await saveProductImage(productImage);
      console.log("Product image saved at:", productImagePath);
    }
    
    // Process each asset and generate an image
    const generatedImages = await Promise.all(
      creativeAssets.assets.map(async (asset) => {
        const assetType = asset.assetType;
        const mappedAsset = assetTypeMapping[assetType] || { 
          type: "other", 
          dimensions: "1000 × 1000" 
        };
        
        // Get the prompt for this asset type from our imagePrompts
        let prompt;
        if (imagePrompts[assetType as keyof typeof imagePrompts]) {
          // Use the real prompt function with asset details and product data
          const promptFn = imagePrompts[assetType as keyof typeof imagePrompts];
          prompt = promptFn(asset, productData);
        } else {
          // Fallback to dummy prompts if asset type not found
          prompt = fallbackPrompt;
        }
        
        // Generate the image with OpenAI
        const imageUrl = await generateImageWithOpenAI(
          prompt, 
          mappedAsset.type,
          productImagePath
        );
        
        return {
          type: mappedAsset.type,
          title: assetType,
          imageUrl,
          dimensions: mappedAsset.dimensions,
          assetDetails: asset
        };
      })
    );
    
    console.log("Generated images:", generatedImages);
    return generatedImages;
    
  } catch (error) {
    console.error("Error generating images:", error);
    // Return dummy images in case of error
    return getDummyImages(creativeAssets);
  }
}

/**
 * Save the uploaded product image to disk
 */
async function saveProductImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Create a unique filename for the uploaded image
  const filename = `product-${uuidv4()}.png`;
  const imagePath = path.join(process.cwd(), 'public', 'generated-images', filename);
  
  // Save the file - use Uint8Array to avoid type issues
  fs.writeFileSync(imagePath, new Uint8Array(bytes));
  
  // Return the path to the saved file
  return imagePath;
}

/**
 * Generate an image using OpenAI Image Edit API
 */
async function generateImageWithOpenAI(
  prompt: string, 
  imageType: string,
  sourceImagePath: string = ''
): Promise<string> {
  try {
    // Generate a unique filename
    const filename = `${imageType}-${uuidv4()}.png`;
    const imagePath = path.join(process.cwd(), 'public', 'generated-images', filename);
    
    // Check if we have an OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.warn("No OpenAI API key found, using fallback images");
      return useFallbackImage(imageType, filename);
    }
    
    // If no source image provided, use image generation API instead
    if (!sourceImagePath || !fs.existsSync(sourceImagePath)) {
      return generateImageWithoutSource(prompt, imageType, filename);
    }
    
    // Make the API call to OpenAI Image Edit API
    console.log(`Generating image for ${imageType} with OpenAI Image Edit API...`);
    
    // Create form data for the API request
    const formData = new FormData();
    
    // Add the required fields
    formData.append('model', 'gpt-image-1');
    formData.append('prompt', prompt);
    formData.append('n', '1');
    formData.append('size', '1024x1024');
    formData.append('quality', 'high');
    
    // Add the image file - use fs.createReadStream for Node.js environment
    formData.append('image', fs.createReadStream(sourceImagePath));
    
    // Call the API
    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders() // Include form data headers
      },
      body: formData as any // Cast to any to avoid type issues
    });

    // Handle API response
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error("OpenAI API error:", responseText);
      return useFallbackImage(imageType, filename);
    }

    // Parse the JSON response
    const data = JSON.parse(responseText) as { data: Array<{ b64_json: string }> };
    
    // Save base64 image data to file
    if (data.data && data.data[0] && data.data[0].b64_json) {
      const base64Data = data.data[0].b64_json;
      const imageBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(imagePath, new Uint8Array(imageBuffer));
      
      // Return the URL to the saved image
      return `/generated-images/${filename}`;
    } else {
      console.error("No base64 image data in response");
      return useFallbackImage(imageType, filename);
    }
    
  } catch (error) {
    console.error(`Error generating image for ${imageType}:`, error);
    // Return a fallback image URL
    return `/vercel.svg`;
  }
}

/**
 * Generate image using the standard image generation API when no source image is available
 */
async function generateImageWithoutSource(
  prompt: string,
  imageType: string,
  filename: string
): Promise<string> {
  try {
    console.log(`No source image provided, using standard image generation API for ${imageType}...`);
    
    const imagePath = path.join(process.cwd(), 'public', 'generated-images', filename);
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      })
    });

    // Handle API response
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error("OpenAI API error:", responseText);
      return useFallbackImage(imageType, filename);
    }

    // Parse the JSON response
    const data = JSON.parse(responseText) as { data: Array<{ b64_json: string }> };
    
    // Save base64 image data to file
    if (data.data && data.data[0] && data.data[0].b64_json) {
      const base64Data = data.data[0].b64_json;
      const imageBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(imagePath, new Uint8Array(imageBuffer));
      
      // Return the URL to the saved image
      return `/generated-images/${filename}`;
    } else {
      console.error("No base64 image data in response");
      return useFallbackImage(imageType, filename);
    }
  } catch (error) {
    console.error(`Error generating image without source for ${imageType}:`, error);
    return useFallbackImage(imageType, filename);
  }
}

/**
 * Use a fallback image when OpenAI API fails or is not available
 */
function useFallbackImage(imageType: string, filename: string): string {
  // For development, we'll use placeholder images from Unsplash
  const unsplashUrls: { [key: string]: string } = {
    "instagram_post": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    "instagram_story": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
    "facebook_post": "https://images.unsplash.com/photo-1611605698335-8b1569810432",
    "linkedin_post": "https://images.unsplash.com/photo-1560472355-536de3962603",
    "website_banner": "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    "other": "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb"
  };
  
  try {
    // Download and save a placeholder image
    const placeholderUrl = unsplashUrls[imageType] || unsplashUrls.other;
    const imagePath = path.join(process.cwd(), 'public', 'generated-images', filename);
    
    // We're not awaiting this, but it's fine for development purposes
    fetch(placeholderUrl)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        // Use Uint8Array to fix type issues with Buffer
        fs.writeFileSync(imagePath, new Uint8Array(buffer));
      })
      .catch(err => console.error("Error saving placeholder image:", err));
    
    return `/generated-images/${filename}`;
  } catch (error) {
    console.error("Error using fallback image:", error);
    return `/vercel.svg`;
  }
}

/**
 * Get dummy images in case of error
 */
function getDummyImages(creativeAssets: CreativeAssetsResponse): GeneratedImage[] {
  return [
    {
      type: "instagram_post",
      title: "Instagram Post",
      imageUrl: "/generated-images/instagram_post-dummy.png",
      dimensions: "1080 × 1080",
      assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Instagram Post")
    },
    {
      type: "instagram_story",
      title: "Instagram Story",
      imageUrl: "/generated-images/instagram_story-dummy.png",
      dimensions: "1080 × 1920",
      assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Instagram Story")
    },
    {
      type: "facebook_post",
      title: "Facebook Post",
      imageUrl: "/generated-images/facebook_post-dummy.png",
      dimensions: "1200 × 630",
      assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Ad Creative")
    },
    {
      type: "linkedin_post",
      title: "LinkedIn Post",
      imageUrl: "/generated-images/linkedin_post-dummy.png",
      dimensions: "1200 × 627",
      assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Testimonial Graphic")
    },
    {
      type: "website_banner",
      title: "Website Banner",
      imageUrl: "/generated-images/website_banner-dummy.png",
      dimensions: "1200 × 400",
      assetDetails: creativeAssets.assets.find(asset => asset.assetType === "Website Banner")
    }
  ];
} 