import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PlanesService } from './planes.service';
import { Plane } from './entities/plane.entity';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';

@Resolver(() => Plane)
export class PlanesResolver {
  constructor(private readonly planesService: PlanesService) {}

  @Mutation(() => Plane)
  createPlane(@Args('createPlaneInput') createPlaneInput: CreatePlaneInput) {
    return this.planesService.create(createPlaneInput);
  }

  @Query(() => [Plane], { name: 'planes' })
  findAll() {
    return this.planesService.findAll();
  }

  @Query(() => Plane, { name: 'plane' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.planesService.findOne(id);
  }

  @Mutation(() => Plane)
  updatePlane(@Args('updatePlaneInput') updatePlaneInput: UpdatePlaneInput) {
    return this.planesService.update(updatePlaneInput);
  }

  @Mutation(() => Plane)
  removePlane(@Args('id', { type: () => Int }) id: number) {
    return this.planesService.remove(id);
  }
}
