import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../database/models';

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;
    return data ? user[data] : user;
  },
);
