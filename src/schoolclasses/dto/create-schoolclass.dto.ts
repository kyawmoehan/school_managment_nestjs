import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSchoolclassDto {
    @IsNumber()
    @IsNotEmpty()
    levelId: number;

    @IsNumber()
    @IsNotEmpty()
    gradeId: number;
}
