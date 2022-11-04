import { Module } from '@nestjs/common';
import { SchoolgradesService } from './schoolgrades.service';
import { SchoolgradesController } from './schoolgrades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schoolgrade } from './entities/schoolgrade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schoolgrade])],
  controllers: [SchoolgradesController],
  providers: [SchoolgradesService],
  exports: [SchoolgradesService],
})
export class SchoolgradesModule { }
