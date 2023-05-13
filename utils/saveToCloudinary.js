const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const generateCloudUrl = async (image) => {
  try {
    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'ecoRPT'
    });

    // Retrieve the secure URL of the uploaded image
    const imageUrl = uploadResult.secure_url;

    return imageUrl;
  } catch (error) {
    throw new Error('Failed to generate Cloudinary URL: ' + error.message);
  }
};

module.exports = { generateCloudUrl };
