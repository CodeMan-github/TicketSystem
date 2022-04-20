import { Injectable } from '@nestjs/common';
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

  async create(createPlaneInput: CreatePlaneInput) {
    // If the plane with the same timeframe exists, reject the creation.
    const plane = this.planeRepository.create(createPlaneInput);
    const countExist = await this.planeRepository.count({
      where: {
        departureAirport: plane.departureAirport,
        arrivalAirport: plane.arrivalAirport,
        departureTime: plane.departureTime,
        arrivalTime: plane.arrivalTime,
      },
    });

    if (countExist === 0) {
      return this.planeRepository.save(plane);
    }

    return -1;
  }

  findAll() {
    return this.planeRepository.find();
  }

  findOne(id: number) {
    return this.planeRepository.findOneOrFail(id);
  }

  async update(updatePlaneInput: UpdatePlaneInput) {
    // If the plane with the same timeframe and different id exists, reject the update.
    const exists = await this.planeRepository.find({
      where: {
        departureAirport: updatePlaneInput.departureAirport,
        arrivalAirport: updatePlaneInput.arrivalAirport,
        departureTime: updatePlaneInput.departureTime,
        arrivalTime: updatePlaneInput.arrivalTime,
      },
    });

    const others = exists.filter(ele => ele.id !== updatePlaneInput.id);
    if (others.length === 0) {
      return this.planeRepository.save(updatePlaneInput);  
    }

    return -1;
  }

  async remove(id: number) {
    const plane = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.remove(plane);
  }
}
