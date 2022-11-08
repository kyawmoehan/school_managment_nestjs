import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolclassesService } from '../schoolclasses/schoolclasses.service';
import { StudentsService } from '../students/students.service';
import { CreateEnrollstudentDto } from './dto/create-enrollstudent.dto';
import { UpdateEnrollstudentDto } from './dto/update-enrollstudent.dto';
import { EnrollStudent } from './entities/enrollstudent.entity';

@Injectable()
export class EnrollstudentsService {
  constructor(
    @InjectRepository(EnrollStudent)
    private enrollstudentRepository: Repository<EnrollStudent>,
    private studentService: StudentsService,
    private schoolclassService: SchoolclassesService,
  ) { }

  async create(createEnrollstudentDto: CreateEnrollstudentDto) {
    const { student, schoolclass } = await this.findStudentAndClass(
      createEnrollstudentDto.studentId,
      createEnrollstudentDto.schoolclassId
    );
    const paid = createEnrollstudentDto.paid;
    const newEnroll = this.enrollstudentRepository.create({ paid, student, schoolclass });
    return this.enrollstudentRepository.save(newEnroll);
  }

  findAll() {
    return this.enrollstudentRepository.find({
      relations: ['student', 'schoolclass'],
    });
  }

  async findOne(id: number) {
    try {
      const enroll = await this.enrollstudentRepository.findOne(
        {
          where: {
            id
          },
          relations: ['student', 'schoolclass'],
          withDeleted: true,
        }
      );
      if (enroll) {
        return enroll;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('Enroll not found');
  }

  async update(id: number, updateEnrollstudentDto: UpdateEnrollstudentDto) {
    try {
      const enroll = await this.findOne(id);
      if (enroll) {
        const { student, schoolclass } = await this.findStudentAndClass(
          updateEnrollstudentDto.studentId || enroll.student.id,
          updateEnrollstudentDto.schoolclassId || enroll.schoolclass.id
        );
        const paid = updateEnrollstudentDto.paid;
        const updateEnroll = this.enrollstudentRepository.create({ paid, student, schoolclass });
        return this.enrollstudentRepository.update(id, updateEnroll);
      }
    } catch (e) {
      throw new e;
    }
  }

  async remove(id: number) {
    try {
      const enroll = await this.findOne(id);
      if (enroll) {
        return this.enrollstudentRepository.softDelete({ id });
      }
    } catch (e) {
      throw new e;
    }
  }

  async findStudentAndClass(studentId: number, schoolclassId: number) {
    const student = await this.studentService.findOne(studentId);
    const schoolclass = await this.schoolclassService.findOne(schoolclassId);
    return { student, schoolclass };
  }
}
