import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PlanesService } from './planes.service';
import { Plane } from './entities/plane.entity';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';

@Resolver(() => Plane)
export class PlanesResolver {
  constructor(private readonly planesService: PlanesService) {}

  /**
  * Function that creates the Plane(Create Action)
  * @param    {CreatePlaneInput} createPlaneInput    The plane object which will be created
  * @return   {Plane}                                Returns the created plane object
  */
  @Mutation(() => Plane)
  createPlane(@Args('createPlaneInput') createPlaneInput: CreatePlaneInput) {
    return this.planesService.create(createPlaneInput);
  }

  /**
  * Function that retrieves all Planes(Read Action)
  * @return   {Plane[]}    Returns all plane objects
  */
  @Query(() => [Plane], { name: 'planes' })
  findAll() {
    return this.planesService.findAll();
  }

  /**
  * Function that retrieves a Plane(Read Action)
  * @param    {number} id     The plane id to retrieve
  * @return   {Plane}         Returns the plane object with id
  */
  @Query(() => Plane, { name: 'plane' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.planesService.findOne(id);
  }

  /**
  * Function that updates the Plane(Update Action)
  * @param    {UpdatePlaneInput} updatePlaneInput    The plane object which will be updated
  * @return   {Plane}                                Returns the updated plane object
  */
  @Mutation(() => Plane)
  updatePlane(@Args('updatePlaneInput') updatePlaneInput: UpdatePlaneInput) {
    return this.planesService.update(updatePlaneInput);
  }

  /**
  * Function that removes the Plane(Remove Action)
  * @param    {number} id     The plane id which will be removed
  * @return   {Plane}         Returns the removed plane object
  */
  @Mutation(() => Plane)
  removePlane(@Args('id', { type: () => Int }) id: number) {
    return this.planesService.remove(id);
  }
}
