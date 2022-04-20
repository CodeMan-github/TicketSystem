import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { Plane } from './entities/plane.entity';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plane)
    private planeRepository: Repository<Plane>,
  ) {}

  create(createPlaneInput: CreatePlaneInput) {
    const plane = this.planeRepository.create(createPlaneInput);
    return this.planeRepository.save(plane);
  }

  findAll() {
    return this.planeRepository.find();
  }

  findOne(id: number) {
    return this.planeRepository.findOneOrFail(id);
  }

  update(updatePlaneInput: UpdatePlaneInput) {
    return this.planeRepository.save(updatePlaneInput);
  }

  async remove(id: number) {
    const plane = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.remove(plane);
  }
}
