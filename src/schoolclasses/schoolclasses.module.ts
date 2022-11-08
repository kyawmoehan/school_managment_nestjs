import { Module } from '@nestjs/common';
import { SchoolclassesService } from './schoolclasses.service';
import { SchoolclassesController } from './schoolclasses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schoolclass } from './entities/schoolclass.entity';
import { Schoollevel } from '../schoollevels/entities/schoollevel.entity';
import { Schoolgrade } from '../schoolgrades/entities/schoolgrade.entity';
import { SchoollevelsModule } from '../schoollevels/schoollevels.module';
import { SchoolgradesModule } from '../schoolgrades/schoolgrades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schoolclass, Schoollevel, Schoolgrade]),
    SchoollevelsModule,
    SchoolgradesModule
  ],
  controllers: [SchoolclassesController],
  providers: [SchoolclassesService],
  exports: [SchoolclassesService]
})
export class SchoolclassesModule { }
