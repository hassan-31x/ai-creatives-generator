import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ProductData = {
  productName: string;
  productTagline: string;
  brandName: string;
  brandTone: string;
  productCategory: string;
  highlightedBenefit: string;
};

export interface CreativeAsset {
  assetType: string;
  backgroundTone: string;
  surfaceType: string;
  accentProp: string;
  lighting: string;
  cameraAngle: string;
  overlayText: string;
}

export interface CreativeAssetsResponse {
  assets: CreativeAsset[];
}

export async function generateCreativeAssets(productData: ProductData): Promise<CreativeAssetsResponse> {
  try {
    const systemPrompt = `You are a luxury product photographer and stylist.

Your task is to suggest creative visual styling elements for 5 product launch assets — each for a different channel. The product is from a premium skincare brand with a clean, minimal, elegant tone — but it's okay to be bold and attention-grabbing where suitable.

Each asset must:

Feel part of the same brand campaign
Use varied styling (not repetitive)
Be visually differentiated based on its platform and purpose
Return a JSON object with the following structure:

For each asset, vary the:

backgroundTone → must be visually attractive and brand-aligned
surfaceType → creative but not distracting
accentProp → feminine, luxurious, and elegant (avoid droplets or overused props)
lighting → varies by mood or asset format
cameraAngle → changes perspective and storytelling
Overlay Text - a short yet attractive copy. (It could be a CTA, a launch offer, a normal text etc.) Avoid using the tagline. Make it sound as if it is coming from a very luxurious setting.
Use tasteful elements like marble, linen, satin, ribbon, flowers, sculptural trays, and glass — but ensure each scene feels premium and styled intentionally.

Do not repeat the same exact prop, background, or layout across assets.

Only respond with the structured JSON output.

Instagram Post
Purpose: Feed-worthy hero image for social media
Visual Style: Polished, balanced composition. Clear product focus. Elegant props. Can be bold or eye-catching.
Instagram Story
Purpose: Vertical (9:16) mobile-first visual
Visual Style: Cropped, zoomed-in. Close-up textures. Feels intimate and lightweight.
Website Banner
Purpose: Wide header for homepage or hero section
Visual Style: Spacious layout with clean negative space. Product is usually off-center. Calm, minimal, premium.
Ad Creative
Purpose: High-impact visual for paid ads or carousels
Visual Style: Bold, contrasty, visually striking but still refined. May use dramatic lighting or color.
Testimonial Graphic
Purpose: Visual support for a customer quote or review
Visual Style: Soft, nurturing, and gentle. Product is present but secondary. Clean and emotionally warm.`;

    const userPrompt = `Product Name: ${productData.productName}
Tagline: ${productData.productTagline}
Brand: ${productData.brandName}
Tone: ${productData.brandTone}
Category: ${productData.productCategory}
Benefit: ${productData.highlightedBenefit}

Please provide creative styling suggestions for 5 different product assets in this exact JSON format. Change the values according to the product data but keep the format same:

{
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
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(content) as CreativeAssetsResponse;
    return parsedResponse;
  } catch (error) {
    console.error("Error generating creative assets:", error);
    // Return fallback assets if OpenAI fails
    return {
      assets: [
        {
          assetType: "Instagram Post",
          backgroundTone: "soft blush gradient",
          surfaceType: "satin draped cloth",
          accentProp: "gold-trimmed ribbon",
          lighting: "warm spotlight from the side",
          cameraAngle: "45-degree angle",
          overlayText: "Glow deeper. Shine brighter."
        },
        {
          assetType: "Instagram Story",
          backgroundTone: "pale lavender with light streaks",
          surfaceType: "textured ceramic tray",
          accentProp: "scattered rose petals",
          lighting: "top-down diffused glow",
          cameraAngle: "zoomed-in overhead view",
          overlayText: "Hydration you can feel. Right now."
        },
        {
          assetType: "Website Banner",
          backgroundTone: "muted green stone texture",
          surfaceType: "brushed concrete slab",
          accentProp: "eucalyptus branch",
          lighting: "soft angled morning light",
          cameraAngle: "side-profile landscape",
          overlayText: "Glow like never before!"
        },
        {
          assetType: "Ad Creative",
          backgroundTone: "deep emerald with gradient fade",
          surfaceType: "reflective glass base",
          accentProp: "frosted crystal orb",
          lighting: "dramatic backlight",
          cameraAngle: "elevated 3/4 angle",
          overlayText: "10% Off Today Only"
        },
        {
          assetType: "Testimonial Graphic",
          backgroundTone: "cream linen with subtle shadows",
          surfaceType: "polished marble",
          accentProp: "single white tulip",
          lighting: "natural side lighting",
          cameraAngle: "clean straight-on view",
          overlayText: "My skin has never felt this good."
        }
      ]
    };
  }
}
