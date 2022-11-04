import { PickType } from '@nestjs/swagger';
import { CreateSchoolgradeDto } from './create-schoolgrade.dto';

export class UpdateSchoolgradeDto extends PickType(CreateSchoolgradeDto, ['name']) { }
