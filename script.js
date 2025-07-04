import { PrismaClient } from "@prisma/client";

const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

const send = async () => {

  const data = {
        userId: '685fe137fcb518056c4b19ce',
        productName: 'Bleu',
        productTagline: 'Smell Beautiful',
        productCategory: 'Fashion',
        highlightedBenefit: 'Experience the best fragrance',
        productDescription: 'Perfume',
        brandName: 'LUMISÉRA',
        brandTone: 'Luxury fragrance — clean, calm, and elegant.',
        colorTheme: 'Deep persian blues, emerald greens, warm golds, and beige.',
        backgroundStyle: 'Soft gradients or realistic textures like water, marble, or satin.',
        lightingStyle: 'Always soft, diffused lighting with a subtle spotlight effect and gentle reflections.',
        productPlacement: 'The product should feel grounded, not floating — placed on surfaces like trays, marble slabs, or fabric. Props like flower petals, ribbons, or boxes can be used sparingly.',
        typographyStyle: 'Use serif fonts in uppercase for titles. For secondary text, use thin script or modern sans-serif. Font color should be white, soft gold, or dark green — never harsh.',
        compositionGuidelines: 'Maintain clean symmetry or elegant off-center balance. Always leave intentional space around the product. Keep supporting elements minimal and refined.',
        
        // Original uploaded image URLs and public IDs
        originalImageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ai-creatives/products/product-34e150e5-3dcf-4501-8083-0227ace29777.png',
        originalImagePublicId: 'ai-creatives/products/product-34e150e5-3dcf-4501-8083-0227ace29777',
        
        // Generated creative image URLs and public IDs
        instagramPostImageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ai-creatives/generated/instagram_post-f91e3b69-846a-419d-aa0b-8e81d1ed99ec.png',
        instagramPostImagePublicId: 'ai-creatives/generated/instagram_post-f91e3b69-846a-419d-aa0b-8e81d1ed99ec',
        instagramStoryImageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ai-creatives/generated/instagram_story-0250ca27-e4f1-4d5a-ac59-4ef2c25599dc.png',
        instagramStoryImagePublicId: 'ai-creatives/generated/instagram_story-0250ca27-e4f1-4d5a-ac59-4ef2c25599dc',
        facebookPostImageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ai-creatives/generated/facebook_post-63a9dbe8-f46d-46f7-9206-768a2452d7de.png',
        facebookPostImagePublicId: 'ai-creatives/generated/facebook_post-63a9dbe8-f46d-46f7-9206-768a2452d7de',
        linkedinPostImageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ai-creatives/generated/linkedin_post-f3e12b77-eeb1-4746-9283-661232b74b47.png',
        linkedinPostImagePublicId: 'ai-creatives/generated/linkedin_post-f3e12b77-eeb1-4746-9283-661232b74b47',
        websiteBannerImageUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/ai-creatives/generated/website_banner-e6abbf4e-fd0a-4e64-9989-9c3f6066b322.png',
        websiteBannerImagePublicId: 'ai-creatives/generated/website_banner-e6abbf4e-fd0a-4e64-9989-9c3f6066b322',
      }

      const submission = await db.submission.create({
        data: data
      })

      console.log(submission)

}
send()