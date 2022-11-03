import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (user) {
        return user;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new NotFoundException('User not found');
  }
}
