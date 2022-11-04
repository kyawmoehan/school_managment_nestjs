import { IsNotEmpty, IsString } from "class-validator";

export class CreateSchoolgradeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
