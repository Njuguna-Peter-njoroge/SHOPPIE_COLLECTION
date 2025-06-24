import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiResponseService {
  ok(data: any, message: string) {
    return {
      success: true,
      message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
    };
  }

  serverError(message: string, statusCode: number, error?: string) {
    return {
      success: false,
      statusCode,
      message,
      error,
    };
  }
}
