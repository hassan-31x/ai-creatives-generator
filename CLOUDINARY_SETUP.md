# Cloudinary Integration Setup

This application now uses Cloudinary for image storage instead of local file storage. Follow these steps to set up Cloudinary:

## 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. Once logged in, go to your Dashboard
3. You'll see your **Cloud name**, **API Key**, and **API Secret**

## 2. Add Environment Variables

Add the following environment variables to your `.env` file:

```bash
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## 3. Update Database Schema

Run the following command to update your database with the new schema:

```bash
npx prisma db push
```

Or if you're using migrations:

```bash
npx prisma migrate dev --name "add-cloudinary-fields"
```

## 4. How It Works

### Image Upload Flow

1. **User uploads product image**: The image is immediately uploaded to Cloudinary in the `ai-creatives/products` folder
2. **OpenAI image generation**: The app uses either:
   - OpenAI Image Generation API (if no product image provided)
   - OpenAI Image Edit API (if product image is provided)
3. **Generated images stored**: All generated images are uploaded to Cloudinary in the `ai-creatives/generated` folder
4. **Database storage**: Both URLs and public IDs are stored in the database for easy management

### Database Changes

The `Submission` model now includes:

- `originalImageUrl` and `originalImagePublicId` for the uploaded product image
- `*ImageUrl` and `*ImagePublicId` for each generated creative type

### Folder Structure in Cloudinary

```
ai-creatives/
├── products/        # Original uploaded product images
├── generated/       # AI-generated creative images
└── fallback/        # Fallback placeholder images
```

## 5. Benefits

- **Scalability**: Images are stored in the cloud, not on your server
- **CDN**: Cloudinary provides global CDN for fast image delivery
- **Optimization**: Automatic image optimization and format conversion
- **Transformations**: Easy image transformations on-the-fly
- **Backup**: Cloudinary handles backups and redundancy

## 6. Cleanup

You can safely delete the `public/generated-images` folder as images are now stored in Cloudinary.

## 7. Cost Considerations

Cloudinary offers a generous free tier:
- 25GB storage
- 25GB bandwidth per month
- 1,000 transformations per month

For production use, monitor your usage and upgrade to a paid plan as needed.
