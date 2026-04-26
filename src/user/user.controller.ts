import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.userService.findByEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
    const payload = { email: user.email, sub: user.id };
    const token = jwt.sign(payload, 'super_secret_key', { expiresIn: '7d' });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
