export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        secure_url: string;
        public_id: string;
    }>;
    deleteImage(publicId: string): Promise<void>;
}
