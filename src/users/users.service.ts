import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
  * Function that creates the User(Create Action)
  * @param    {CreateUserInput} createUserInput     The user object which will be created
  * @return   {User}                                Returns the created user object
  */
  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  /**
  * Function that retrieves all Users(Read Action)
  * @return   {User[]}    Returns all user objects
  */
  findAll() {
    return this.userRepository.find();
  }

  /**
  * Function that retrieves a User(Read Action)
  * @param    {number} id     The user id to retrieve
  * @return   {User}          Returns the user object with id
  */
  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  /**
  * Function that updates the User(Update Action)
  * @param    {UpdateUserInput} updateUserInput     The user object which will be updated
  * @return   {User}                                Returns the updated user object
  */
  update(updateUserInput: UpdateUserInput) {
    return this.userRepository.save(updateUserInput);
  }

  /**
  * Function that removes the User(Remove Action)
  * @param    {number} id     The user id which will be removed
  * @return   {User}          Returns the removed user object
  */
  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail(id);
    return this.userRepository.remove(user);
  }
}
