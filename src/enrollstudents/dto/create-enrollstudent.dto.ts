import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEnrollstudentDto {
    @IsNumber()
    @IsNotEmpty()
    studentId: number;

    @IsNumber()
    @IsNotEmpty()
    schoolclassId: number;

    @IsNumber()
    @IsNotEmpty()
    paid: number;
}
