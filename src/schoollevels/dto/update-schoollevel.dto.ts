import { PickType } from '@nestjs/swagger';
import { CreateSchoollevelDto } from './create-schoollevel.dto';

export class UpdateSchoollevelDto extends PickType(CreateSchoollevelDto, ['name']) { }
