import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: 'dtnqkbuxn',
      api_key: '167456968231542',
      api_secret: 'c_-O0na1Ba0cShw6V3aBdkq1x5o',
    });
  },
};
