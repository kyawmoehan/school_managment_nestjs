import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateSchoolclassDto {
    @IsNumber()
    @IsNotEmpty()
    levelId: number;

    @IsNumber()
    @IsNotEmpty()
    gradeId: number;
}
