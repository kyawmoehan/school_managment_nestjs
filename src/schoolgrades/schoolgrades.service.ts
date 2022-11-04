import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolgradeDto } from './dto/create-schoolgrade.dto';
import { UpdateSchoolgradeDto } from './dto/update-schoolgrade.dto';
import { Schoolgrade } from './entities/schoolgrade.entity';

@Injectable()
export class SchoolgradesService {
  constructor(
    @InjectRepository(Schoolgrade)
    private schoolgradeRepository: Repository<Schoolgrade>,
  ) { }

  create(createSchoolgradeDto: CreateSchoolgradeDto) {
    const newLevel = this.schoolgradeRepository.create(createSchoolgradeDto);
    return this.schoolgradeRepository.save(newLevel);
  }

  findAll() {
    return this.schoolgradeRepository.find();
  }

  async findOne(id: number) {
    try {
      const role = await this.schoolgradeRepository.findOneBy({ id });
      if (role) {
        return role;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    throw new NotFoundException('School grade not found');
  }

  async update(id: number, updateSchoolgradeDto: UpdateSchoolgradeDto) {
    try {
      const role = await this.findOne(id);
      if (role) {
        return this.schoolgradeRepository.update(id, updateSchoolgradeDto);
      }
    } catch (e) {
      throw new e;
    }
  }

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      if (role) {
        return this.schoolgradeRepository.softDelete({ id });
      }
    } catch (e) {
      throw new e;
    }
  }
}
