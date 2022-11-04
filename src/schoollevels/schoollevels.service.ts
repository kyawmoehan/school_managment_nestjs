import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoollevelDto } from './dto/create-schoollevel.dto';
import { UpdateSchoollevelDto } from './dto/update-schoollevel.dto';
import { Schoollevel } from './entities/schoollevel.entity';

@Injectable()
export class SchoollevelsService {
  constructor(
    @InjectRepository(Schoollevel)
    private schoollevelRepository: Repository<Schoollevel>,
  ) { }

  create(createSchoollevelDto: CreateSchoollevelDto) {
    const newLevel = this.schoollevelRepository.create(createSchoollevelDto);
    return this.schoollevelRepository.save(newLevel);
  }

  findAll() {
    return this.schoollevelRepository.find();
  }

  async findOne(id: number) {
    try {
      const role = await this.schoollevelRepository.findOneBy({ id });
      if (role) {
        return role;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('School level not found');
  }

  async update(id: number, updateSchoollevelDto: UpdateSchoollevelDto) {
    try {
      const role = await this.findOne(id);
      if (role) {
        return this.schoollevelRepository.update(id, updateSchoollevelDto);
      }
    } catch (e) {
      throw new e;
    }
  }

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      if (role) {
        return this.schoollevelRepository.softDelete({ id });
      }
    } catch (e) {
      throw new e;
    }
  }
}
