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

  /**
  * Function that creates the Plane(Create Action)
  * @param    {CreatePlaneInput} createPlaneInput    The plane object which will be created
  * @return   {Plane}                                Returns the created plane object
  */
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

  /**
  * Function that retrieves all Planes(Read Action)
  * @return   {Plane[]}    Returns all plane objects
  */
  findAll() {
    return this.planeRepository.find();
  }

  /**
  * Function that retrieves a Plane(Read Action)
  * @param    {number} id     The plane id to retrieve
  * @return   {Plane}         Returns the plane object with id
  */
  findOne(id: number) {
    return this.planeRepository.findOneOrFail(id);
  }

  /**
  * Function that updates the Plane(Update Action)
  * @param    {UpdatePlaneInput} updatePlaneInput    The plane object which will be updated
  * @return   {Plane}                                Returns the updated plane object
  */
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

  /**
  * Function that removes the Plane(Remove Action)
  * @param    {number} id     The plane id which will be removed
  * @return   {Plane}         Returns the removed plane object
  */
  async remove(id: number) {
    const plane = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.remove(plane);
  }
}
