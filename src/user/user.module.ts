import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Car } from '../car/entities/car.entity';
import { Trip } from 'src/trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, Trip])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
