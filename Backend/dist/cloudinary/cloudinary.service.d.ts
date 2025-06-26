import { CloudinaryStorage } from 'multer-storage-cloudinary';
export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
    deleteImage(publicId: string): Promise<void>;
    getCloudinaryStorage(): CloudinaryStorage;
}
