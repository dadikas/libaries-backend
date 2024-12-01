
import { SetMetadata } from '@nestjs/common';

export const AuthorizeRole = (...roles: string[]) => SetMetadata('allowedRole', roles);
