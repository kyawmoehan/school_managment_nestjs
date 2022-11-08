import { PartialType } from '@nestjs/swagger';
import { CreateEnrollstudentDto } from './create-enrollstudent.dto';

export class UpdateEnrollstudentDto extends PartialType(CreateEnrollstudentDto) {}
