import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { Response } from 'express';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = `Database error`;

    if (exception instanceof QueryFailedError) {
      if (exception.driverError?.code === PostgresError.UNIQUE_VIOLATION) {
        message = 'Duplicate entry';
        statusCode = HttpStatus.CONFLICT;
      }
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
