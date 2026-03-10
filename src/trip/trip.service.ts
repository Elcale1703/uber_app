import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createTripDto: CreateTripDto) {
    const userExists = await this.userRepository.findOneBy({ id: createTripDto.user });
    if (!userExists) {
      throw new NotFoundException(`User #${createTripDto.user} not found`);
    }
    const trip = this.tripRepository.create({
      ...createTripDto,
      user: userExists
    });
    return this.tripRepository.save(trip);
  }

  findAll() {
    return this.tripRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!trip) throw new NotFoundException(`Trip #${id} not found`);
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);
    
    if (updateTripDto.user) {
      const userExists = await this.userRepository.findOneBy({ id: updateTripDto.user });
      if (!userExists) {
        throw new NotFoundException(`User #${updateTripDto.user} not found`);
      }
    }

    Object.assign(trip, updateTripDto);
    return this.tripRepository.save(trip);
  }

  async remove(id: number) {
    const trip = await this.findOne(id);
    return this.tripRepository.remove(trip);
  }
}
