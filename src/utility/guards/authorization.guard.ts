import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, mixin } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean{
//         const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());
//         const request = context.switchToHttp().getRequest();
//         const result=  request?.currentUser?.roles
//         .map(role=>role.name)
//         .some(role=>allowedRoles.includes(role))
//         .find((val:boolean)=>val);
//         if(result){
//             return true;
//         }
//         throw new UnauthorizedException('You are not authorized to access this resource');
//     }
// }

export const AuthorizeGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean{
            const request = context.switchToHttp().getRequest();
            const result=  request?.currentUser?.roles
            .map(role=>role.name)
            .some(role=>allowedRoles.includes(role))
            .find((val:boolean)=>val);
            if(result){
                return true;
            }
            throw new UnauthorizedException('You are not authorized to access this resource');
        }
    }
    const guard = mixin(RolesGuardMixin);
    return guard;
}
