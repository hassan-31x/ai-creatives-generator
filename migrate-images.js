import { PrismaClient } from "@prisma/client";
import { uploadToCloudinary } from "./lib/cloudinary.js";
import fs from 'fs';
import path from 'path';

const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// Function to upload a local image file to Cloudinary
async function uploadLocalImageToCloudinary(localPath, cloudinaryFolder, publicIdPrefix) {
  try {
    if (!fs.existsSync(localPath)) {
      console.log(`File not found: ${localPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(localPath);
    const filename = path.basename(localPath, path.extname(localPath));
    
    const result = await uploadToCloudinary(imageBuffer, {
      folder: cloudinaryFolder,
      public_id: `${publicIdPrefix}-${filename}`,
    });

    console.log(`✅ Uploaded ${localPath} to Cloudinary: ${result.secure_url}`);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error);
    return null;
  }
}

// Get raw submissions using MongoDB operations to access old fields
async function getRawSubmissions() {
  try {
    // Use $runCommandRaw to execute MongoDB queries directly
    const result = await db.$runCommandRaw({
      find: "Submission",
      filter: {}
    });
    
    return result.cursor.firstBatch;
  } catch (error) {
    console.error("Error getting raw submissions:", error);
    return [];
  }
}

// Main migration function
const migrateImagesToCloudinary = async () => {
  try {
    console.log("🚀 Starting migration of existing images to Cloudinary...");
    
    // Get all submissions using raw MongoDB query
    const submissions = await getRawSubmissions();

    console.log(`📊 Found ${submissions.length} submissions to process`);

    for (const submission of submissions) {
      console.log(`\n🔄 Processing submission: ${submission._id} (${submission.productName})`);
      
      const updateData = {};
      const publicDir = path.join(process.cwd(), 'public');
      
      // Map old field to new field and upload each image type
      const imageMappings = [
        {
          oldField: 'originalImage',
          newUrlField: 'originalImageUrl',
          newPublicIdField: 'originalImagePublicId',
          folder: 'ai-creatives/products',
          prefix: 'product'
        },
        {
          oldField: 'instagramPostImage',
          newUrlField: 'instagramPostImageUrl',
          newPublicIdField: 'instagramPostImagePublicId',
          folder: 'ai-creatives/generated',
          prefix: 'instagram_post'
        },
        {
          oldField: 'instagramStoryImage',
          newUrlField: 'instagramStoryImageUrl',
          newPublicIdField: 'instagramStoryImagePublicId',
          folder: 'ai-creatives/generated',
          prefix: 'instagram_story'
        },
        {
          oldField: 'facebookPostImage',
          newUrlField: 'facebookPostImageUrl',
          newPublicIdField: 'facebookPostImagePublicId',
          folder: 'ai-creatives/generated',
          prefix: 'facebook_post'
        },
        {
          oldField: 'linkedinPostImage',
          newUrlField: 'linkedinPostImageUrl',
          newPublicIdField: 'linkedinPostImagePublicId',
          folder: 'ai-creatives/generated',
          prefix: 'linkedin_post'
        },
        {
          oldField: 'websiteBannerImage',
          newUrlField: 'websiteBannerImageUrl',
          newPublicIdField: 'websiteBannerImagePublicId',
          folder: 'ai-creatives/generated',
          prefix: 'website_banner'
        }
      ];

      for (const mapping of imageMappings) {
        const oldImagePath = submission[mapping.oldField];
        
        if (oldImagePath && oldImagePath.startsWith('/generated-images/')) {
          // Convert old path to local file path
          const localPath = path.join(publicDir, oldImagePath);
          
          // Upload to Cloudinary
          const cloudinaryResult = await uploadLocalImageToCloudinary(
            localPath,
            mapping.folder,
            mapping.prefix
          );
          
          if (cloudinaryResult) {
            updateData[mapping.newUrlField] = cloudinaryResult.url;
            updateData[mapping.newPublicIdField] = cloudinaryResult.publicId;
            console.log(`  ✅ ${mapping.oldField} -> ${mapping.newUrlField}`);
          } else {
            // Set empty values if upload failed
            updateData[mapping.newUrlField] = '';
            updateData[mapping.newPublicIdField] = '';
            console.log(`  ❌ Failed to upload ${mapping.oldField}`);
          }
        } else {
          // Set empty values if no old image path
          updateData[mapping.newUrlField] = '';
          updateData[mapping.newPublicIdField] = '';
        }
      }
      
      // Update the submission with new Cloudinary URLs and public IDs using the ObjectId
      if (Object.keys(updateData).length > 0) {
        await db.submission.update({
          where: { id: submission._id.$oid },
          data: updateData
        });
        
        console.log(`  💾 Updated submission ${submission._id.$oid} with Cloudinary URLs`);
      }
    }
    
    console.log("\n🎉 Migration completed successfully!");
    console.log("📝 Next steps:");
    console.log("   1. Verify images are accessible via the new Cloudinary URLs");
    console.log("   2. Update your frontend to use the new *ImageUrl fields");
    console.log("   3. Consider removing the old *Image fields from the database schema");
    console.log("   4. You can now safely delete the public/generated-images folder");
    
  } catch (error) {
    console.error("💥 Migration failed:", error);
  } finally {
    await db.$disconnect();
  }
};

// Run the migration
migrateImagesToCloudinary();
