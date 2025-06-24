export declare class ApiResponseService {
    ok(data: any, message: string): {
        success: boolean;
        message: string;
        data: any;
    };
    serverError(message: string, statusCode: number, error?: string): {
        success: boolean;
        statusCode: number;
        message: string;
        error: string | undefined;
    };
}
