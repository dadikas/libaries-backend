import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignUp{
    @IsNotEmpty({message: 'Name can not be null.'})
    @IsString({message: 'Name must be a string.'})
    name: string;

    @IsNotEmpty({message: 'Email can not be null.'})
    @IsEmail({}, {message: 'Email must be a valid email.'})
    email: string;

    @IsNotEmpty({message: 'Password can not be null.'})
    @MinLength(6, {message: 'Password must be at least 6 characters.'})
    password: string;
}