import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  update(updateUserInput: UpdateUserInput) {
    return this.userRepository.save(updateUserInput);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail(id);
    return this.userRepository.remove(user);
  }
}
