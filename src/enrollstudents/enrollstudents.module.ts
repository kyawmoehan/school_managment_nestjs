import { Module } from '@nestjs/common';
import { EnrollstudentsService } from './enrollstudents.service';
import { EnrollstudentsController } from './enrollstudents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollStudent } from './entities/enrollstudent.entity';
import { StudentsModule } from '../students/students.module';
import { SchoolclassesModule } from '../schoolclasses/schoolclasses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollStudent]),
    StudentsModule,
    SchoolclassesModule
  ],
  controllers: [EnrollstudentsController],
  providers: [EnrollstudentsService]
})
export class EnrollstudentsModule { }
