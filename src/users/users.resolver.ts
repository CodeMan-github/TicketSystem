import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
  * Function that creates the User(Create Action)
  * @param    {CreateUserInput} createUserInput     The user object which will be created
  * @return   {User}                                Returns the created user object
  */
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  /**
  * Function that retrieves all Users(Read Action)
  * @return   {User[]}    Returns all user objects
  */
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  /**
  * Function that retrieves a User(Read Action)
  * @param    {number} id     The user id to retrieve
  * @return   {User}          Returns the user object with id
  */
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  /**
  * Function that updates the User(Update Action)
  * @param    {UpdateUserInput} updateUserInput     The user object which will be updated
  * @return   {User}                                Returns the updated user object
  */
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  /**
  * Function that removes the User(Remove Action)
  * @param    {number} id     The user id which will be removed
  * @return   {User}          Returns the removed user object
  */
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
