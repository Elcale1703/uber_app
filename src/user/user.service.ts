import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Car } from '../car/entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>
  ) { }
  async create(createUserDto: CreateUserDto) {
    const exists = await this.usersRepository.findOneBy({
      id: createUserDto.id,
    });
    if (exists)
      throw new ConflictException(`User #${createUserDto.id} already exists`);

    const emailExists = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (emailExists)
      throw new ConflictException(
        `Email ${createUserDto.email} already in use`,
      );

    if (createUserDto.car) {
      const carId = createUserDto.car;
      const carExists = await this.carRepository.findOneBy({ id: carId });
      if (!carExists) {
        throw new NotFoundException(`Car #${carId} not found`);
      }
      createUserDto.car = carExists;
    }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({ relations: ['car', 'trips'] });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['car', 'trips']
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);

    if (updateUserDto.car) {
      const carId = updateUserDto.car;
      const carExists = await this.carRepository.findOneBy({ id: carId });
      if (!carExists) {
        throw new NotFoundException(`Car #${carId} not found`);
      }
      updateUserDto.car = carExists;
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return this.usersRepository.remove(user);
  }
}