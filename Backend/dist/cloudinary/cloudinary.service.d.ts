import { UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
    deleteImage(publicId: string): Promise<void>;
}
