import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const nameExit = await this.roleRepository.findOne({
      where: {
        name: createRoleDto.name
      }
    });
    if (nameExit) {
      throw new ConflictException('Role already exit');
    }
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOneBy({ id });
      if (role) {
        return role;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('Role not found');
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.findOneBy({ id });
      if (role) {
        return this.roleRepository.update(id, updateRoleDto);
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('Role not found')
  }

  async remove(id: number) {
    try {
      const role = await this.roleRepository.findOneBy({ id });
      if (role) {
        return this.roleRepository.softDelete({ id });
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    throw new NotFoundException('Role not found')
  }
}
