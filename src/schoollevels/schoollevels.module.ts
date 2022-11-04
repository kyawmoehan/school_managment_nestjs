import { Module } from '@nestjs/common';
import { SchoollevelsService } from './schoollevels.service';
import { SchoollevelsController } from './schoollevels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schoollevel } from './entities/schoollevel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schoollevel])],
  controllers: [SchoollevelsController],
  providers: [SchoollevelsService],
  exports: [SchoollevelsService],
})
export class SchoollevelsModule { }
