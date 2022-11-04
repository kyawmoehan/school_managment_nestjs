import { IsNotEmpty, IsString } from "class-validator";

export class CreateSchoollevelDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
