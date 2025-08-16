import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserT } from '@prisma/client';

export type CurrentUserPayload = UserT & {
  exp?: number;
  iat?: number;
  roles?: string[];
  permissions?: string[];
  serviceAreas?: string[];
  isAdmin?: boolean;
};

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as CurrentUserPayload;

    if (user.exp && new Date() > new Date(user.exp * 1000)) {
      throw new HttpException('Authorization is expired', HttpStatus.UNAUTHORIZED);
    }

    return data ? user?.[data as keyof CurrentUserPayload] : user;
  },
);
