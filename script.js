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
        originalImage: '/generated-images/product-34e150e5-3dcf-4501-8083-0227ace29777.png',
        instagramPostImage: '/generated-images/instagram_post-f91e3b69-846a-419d-aa0b-8e81d1ed99ec.png',
        instagramStoryImage: '/generated-images/instagram_story-0250ca27-e4f1-4d5a-ac59-4ef2c25599dc.png',
        facebookPostImage: '/generated-images/facebook_post-63a9dbe8-f46d-46f7-9206-768a2452d7de.png',
        linkedinPostImage: '/generated-images/linkedin_post-f3e12b77-eeb1-4746-9283-661232b74b47.png',
        websiteBannerImage: '/generated-images/website_banner-e6abbf4e-fd0a-4e64-9989-9c3f6066b322.png',
      }

      const submission = await db.submission.create({
        data: data
      })

      console.log(submission)

}
send()