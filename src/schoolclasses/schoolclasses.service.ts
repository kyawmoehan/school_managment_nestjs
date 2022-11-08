import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolgradesService } from '../schoolgrades/schoolgrades.service';
import { SchoollevelsService } from '../schoollevels/schoollevels.service';
import { CreateSchoolclassDto } from './dto/create-schoolclass.dto';
import { UpdateSchoolclassDto } from './dto/update-schoolclass.dto';
import { Schoolclass } from './entities/schoolclass.entity';

@Injectable()
export class SchoolclassesService {
  constructor(
    @InjectRepository(Schoolclass)
    private schoolclassRepository: Repository<Schoolclass>,
    private readonly schoollevelsService: SchoollevelsService,
    private readonly schoolgradesService: SchoolgradesService,
  ) { }

  async create(createSchoolclassDto: CreateSchoolclassDto) {
    const { schoollevel, schoolgrade } = await this.findLevelAndGrade(
      createSchoolclassDto.levelId,
      createSchoolclassDto.gradeId
    );
    const price = createSchoolclassDto.price;
    const newSchoolClass = this.schoolclassRepository.create({ price, schoollevel, schoolgrade });
    return this.schoolclassRepository.save(newSchoolClass);
  }

  findAll() {
    return this.schoolclassRepository.find({
      relations: ['schoolgrade', 'schoollevel'],
      withDeleted: true,
    });
  }

  async findOne(id: number) {
    try {
      const schoolClass = await this.schoolclassRepository.findOne(
        {
          where: {
            id
          },
          relations: ['schoolgrade', 'schoollevel'],
          withDeleted: true,
        }
      );
      if (schoolClass) {
        return schoolClass;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('School class not found');
  }

  async update(id: number, updateSchoolclassDto: UpdateSchoolclassDto) {
    try {
      const schoolClass = await this.findOne(id);
      if (schoolClass) {
        const { schoollevel, schoolgrade } = await this.findLevelAndGrade(
          updateSchoolclassDto.levelId || schoolClass.schoollevel.id,
          updateSchoolclassDto.gradeId || schoolClass.schoolgrade.id
        );
        const price = updateSchoolclassDto.price;

        const updateSchoolClass = this.schoolclassRepository.create({ price, schoollevel, schoolgrade });
        return this.schoolclassRepository.update(id, updateSchoolClass);
      }
    } catch (e) {
      throw new e;
    }
  }

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      if (role) {
        return this.schoolclassRepository.softDelete({ id });
      }
    } catch (e) {
      throw new e;
    }
  }

  async findLevelAndGrade(levelId: number, gradeId: number) {
    const schoollevel = await this.schoollevelsService.findOne(levelId);
    const schoolgrade = await this.schoolgradesService.findOne(gradeId);
    return { schoollevel, schoolgrade };
  }
}
