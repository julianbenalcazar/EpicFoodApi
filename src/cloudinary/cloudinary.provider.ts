import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: 'dtnqkbuxn',
      api_key: '167456968231542',
      api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
    });
  },
};
