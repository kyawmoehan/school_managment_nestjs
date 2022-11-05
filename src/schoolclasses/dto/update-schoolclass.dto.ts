import { IsNumber, IsOptional } from "class-validator";

export class UpdateSchoolclassDto {
    @IsNumber()
    @IsOptional()
    levelId: number;

    @IsNumber()
    @IsOptional()
    gradeId: number;

    @IsNumber()
    @IsOptional()
    price: number;
}
