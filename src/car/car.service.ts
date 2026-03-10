import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>) { }
  async create(createCarDto: CreateCarDto) {
    const exists = await this.carRepository.findOneBy({
      id: createCarDto.id,
    });
    if (exists)
      throw new ConflictException(`Car #${createCarDto.id} already exists`);
    const plateExists = await this.carRepository.findOneBy({
      plate: createCarDto.plate,
    })
    if (plateExists)
      throw new ConflictException(`Car with plate ${createCarDto.plate} already exists`);

    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  findAll() {
    return this.carRepository.find();
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) throw new NotFoundException(`Car #${id} not found`);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    if (!car) throw new NotFoundException(`Car #${id} not found`);
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    if (!car) throw new NotFoundException(`Car #${id} not found`);
    return this.carRepository.remove(car);
  }
}
