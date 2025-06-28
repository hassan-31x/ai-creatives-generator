// Static prompts for different asset types
// These will be used to generate images via OpenAI API

export const imagePrompts = {
  "Instagram Post": (assetDetails: any, productData: any) => `
    Create a square (1:1) photorealistic **Instagram Post** visual for the ${productData.productCategory} product ${productData.productName} from ${productData.brandName}.
This is the **hero asset** in the product launch — it should feel bold, polished, and visually iconic. The composition must be clean, centered, and brand-first, setting the tone for the entire campaign.
The product image is provided — do not alter it. Integrate it into a stylized visual scene.

Use a ${assetDetails.backgroundTone} background that reflects natural elegance — this may include textures like fabric folds, water ripples, or gradient light. Place the product on a ${assetDetails.surfaceType}.

Introduce a complementary accent prop like a ${assetDetails.accentProp} to enrich the visual story. Ensure props enhance, not clutter.

Apply ${assetDetails.lighting} to add dimension, and capture the image from a ${assetDetails.cameraAngle} — this may be slightly off-center, angled, or from above to create depth.

Follow the brand's identity and styling rules:
- Tone: ${productData.brandTone}
- Color palette: ${productData.colorTheme || "Elegant, premium tones"}
- Typography style (for brand reference only): ${productData.typographyStyle || "Clean, modern fonts"}
- Product placement rules: ${productData.productPlacement || "Centered, elevated placement"}
- Composition: ${productData.compositionGuidelines || "Clean, minimal composition"}

Feel free to include overlay text - "${assetDetails.overlayText}". Ensure it is clearly legible, elegantly styled, and placed harmoniously within the composition. 

This should be a clean, emotionally resonant product visual — worthy of a high-end Instagram or print campaign.
  `,
  
  "Instagram Story": (assetDetails: any, productData: any) => `
    Create a vertical 9:16 photorealistic **Instagram Story** visual for the ${productData.productCategory} product ${productData.productName} from ${productData.brandName}.

This is a **mobile-first asset** — it should feel closer, more intimate, and optimized for scrolling. The visual must feel lighter and more immersive than the hero post, with vertical flow and tactile textures.
The product image is provided — do not alter it. Integrate it into a vertical, immersive, mobile-first visual scene.

Use a ${assetDetails.backgroundTone} background with vertical flow — it may include soft light gradients, fabric drapes, or textured wall tones. Place the product on a ${assetDetails.surfaceType} appropriate for an elegant vertical composition.

Introduce a complementary vertical-friendly accent prop like a ${assetDetails.accentProp} to frame the product visually. Keep it minimal and scroll-worthy.

Apply ${assetDetails.lighting} to enhance clarity on mobile screens, and capture the image from a ${assetDetails.cameraAngle} that fits the tall format naturally.

Follow the brand's identity and styling rules:
- Tone: ${productData.brandTone}
- Color palette: ${productData.colorTheme || "Elegant, premium tones"}
- Typography style (for brand reference only): ${productData.typographyStyle || "Clean, modern fonts"}
- Product placement rules: ${productData.productPlacement || "Centered, elevated placement"}
- Composition: ${productData.compositionGuidelines || "Clean, minimal composition"}

Feel free to include overlay text - "${assetDetails.overlayText}". Ensure it is clearly legible, elegantly styled, and placed harmoniously within the composition. 

This should feel refined, light, and scroll-stopping on a premium ${productData.productCategory} brand's Instagram Story.

  `,
  
  "Website Banner": (assetDetails: any, productData: any) => `
    Create a horizontal 16:9 photorealistic **Website Banner** visual for the ${productData.productCategory} product ${productData.productName} from ${productData.brandName}.

This asset is for a homepage hero section. It must feel **spacious, minimal, and refined**, with clean off-center layout and breathing room. Visually, it should contrast from the bolder social assets and feel more ambient.
The product image is provided — do not alter it. Integrate it into a clean, web-friendly layout with ample negative space.

Use a ${assetDetails.backgroundTone} background that works well on large desktop screens — think smooth gradients, soft textures, or minimal fabric scenes. Place the product on a ${assetDetails.surfaceType} with a clear left or right alignment.

Include a single complementary accent prop such as a ${assetDetails.accentProp} — soft, grounded, and not distracting. Keep the overall layout breathable.

Apply ${assetDetails.lighting} for subtle depth, and shoot from a ${assetDetails.cameraAngle} that supports side placement or spacing for overlay text externally (not in image).

Follow the brand's identity and styling rules:
- Tone: ${productData.brandTone}
- Color palette: ${productData.colorTheme || "Elegant, premium tones"}
- Typography style (for brand reference only): ${productData.typographyStyle || "Clean, modern fonts"}
- Product placement rules: ${productData.productPlacement || "Centered, elevated placement"}
- Composition: ${productData.compositionGuidelines || "Clean, minimal composition"}

Feel free to include overlay text - "${assetDetails.overlayText}". Ensure it is clearly legible, elegantly styled, and placed harmoniously within the composition. 

This should feel modern, clean, and aligned with a premium ${productData.productCategory} homepage aesthetic.

  `,
  
  "Ad Creative": (assetDetails: any, productData: any) => `
    Create a square 1:1 photorealistic **Ad Creative** visual for the ${productData.productCategory} product ${productData.productName} from ${productData.brandName}.

This is a **scroll-stopping ad** meant for paid social. It should feel **high-impact, dramatic, and visually punchy** — bold lighting, confident angles, and a strong visual hierarchy that stands apart from brand feed content.
The product image is provided — do not alter it. Integrate it into a bold and visually striking layout designed for advertising.

Use a ${assetDetails.backgroundTone} background that immediately catches the eye — it may be deep, contrasty, or high-gloss. Place the product on a ${assetDetails.surfaceType} that adds visual punch without distraction.

Introduce a dynamic accent prop like a ${assetDetails.accentProp} to elevate the scene. The layout should feel purposeful and energetic.

Apply ${assetDetails.lighting} for contrast and bold shadows, and shoot from a ${assetDetails.cameraAngle} that adds visual drama and structure.

Follow the brand's identity and styling rules:
- Tone: ${productData.brandTone}
- Color palette: ${productData.colorTheme || "Elegant, premium tones"}
- Typography style (for brand reference only): ${productData.typographyStyle || "Clean, modern fonts"}
- Product placement rules: ${productData.productPlacement || "Centered, elevated placement"}
- Composition: ${productData.compositionGuidelines || "Clean, minimal composition"}

Feel free to include overlay text - "${assetDetails.overlayText}". Ensure it is clearly legible, elegantly styled, and placed harmoniously within the composition. 

This should stop the scroll and feel luxurious, modern, and ad-ready while staying true to the brand.

  `,
  
  "Testimonial Graphic": (assetDetails: any, productData: any) => `
    Create a square 1:1 photorealistic **Testimonial Graphic** visual for the ${productData.productCategory} product ${productData.productName} from ${productData.brandName}.

This asset supports a customer review or quote — it should feel **soft, nurturing, and emotionally warm**. Unlike bolder campaign assets, the design here must feel quiet, minimal, and sincere, drawing attention subtly to the product.
The product image is provided — do not alter it. Integrate it into a soft, calming visual meant to support a customer testimonial.

Use a ${assetDetails.backgroundTone} background with muted tones — textures like linen, cream paper, or pastel gradients are welcome. Place the product gently on a ${assetDetails.surfaceType} that feels warm and nurturing.

Add a gentle, emotional prop like a ${assetDetails.accentProp}. Keep all elements minimal, sincere, and comforting.

Apply ${assetDetails.lighting} to soften the scene, and shoot from a ${assetDetails.cameraAngle} that conveys trust and simplicity.

Follow the brand's identity and styling rules:
- Tone: ${productData.brandTone}
- Color palette: ${productData.colorTheme || "Elegant, premium tones"}
- Typography style (for brand reference only): ${productData.typographyStyle || "Clean, modern fonts"}
- Product placement rules: ${productData.productPlacement || "Centered, elevated placement"}
- Composition: ${productData.compositionGuidelines || "Clean, minimal composition"}

Feel free to include overlay text - "${assetDetails.overlayText}". Ensure it is clearly legible, elegantly styled, and placed harmoniously within the composition. 


This image should quietly support a testimonial or review without overshadowing it — calm, minimal, and emotionally resonant.
  `
};

// Fallback prompt in case asset type is not found
export const fallbackPrompt = `
  Create a premium, elegant product image for a luxury product.
  Style: Clean, minimal composition with soft lighting and premium props like marble or satin.
  Make it look high-end and sophisticated.
`;

// Static dummy prompts for development to save API costs
export const dummyPrompts = {
  "Instagram Post": "A luxury product on a marble surface with soft gold lighting and rose petals",
  "Instagram Story": "A vertical close-up of a premium bottle with diffused lighting and silk backdrop",
  "Website Banner": "A wide banner showing an elegant product on a minimalist surface with soft shadows",
  "Ad Creative": "A dramatic product shot of a luxury item with bold lighting and premium props",
  "Testimonial Graphic": "A gentle, warm image of a product with soft lighting and subtle floral elements"
}; 