import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RoleEnum } from "../enum/role.enum";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: RoleEnum, default: RoleEnum.Admin, })
    @IsNumber()
    @IsNotEmpty()
    roleId: number;
}