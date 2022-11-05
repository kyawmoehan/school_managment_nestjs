import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) { }

  create(createStudentDto: CreateStudentDto, image: Express.Multer.File) {
    const path = image.path;
    const newStudent = this.studentRepository.create({ ...createStudentDto, image: path });
    return this.studentRepository.save(newStudent);
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    try {
      const student = await this.studentRepository.findOne(
        {
          where: {
            id
          },
        }
      );
      if (student) {
        return student;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('Student not found');
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: number) {
    try {
      const student = await this.findOne(id);
      if (student) {
        this.removeFile(student.image);
        return this.studentRepository.softDelete({ id });
      }
    } catch (e) {
      throw e;
    }
  }

  removeFile(path: string) {
    const filePath = join(process.cwd(), path)
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
}
