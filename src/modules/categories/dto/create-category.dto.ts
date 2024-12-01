import { IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'This field cannot be empty' })
    @IsString({ message: 'This field must be a string' })
    title: string;

    @IsNotEmpty({ message: 'This description cannot be empty' })
    @IsString({ message: 'This description must be a string' })
    description:string;
}
