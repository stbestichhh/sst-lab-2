import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(message: string) {
    super(
      { message, error: 'Database Error', status: HttpStatus.BAD_REQUEST },
      HttpStatus.BAD_REQUEST,
    );
  }
}
