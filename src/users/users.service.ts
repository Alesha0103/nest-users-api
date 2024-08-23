import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './enteties/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User Not Found");
    }
    return user;
  }

  async create(createUserDTO: CreateUserDTO) {
    const newUser = this.usersRepository.create(createUserDTO);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    await this.usersRepository.update(id, updateUserDTO);
    return await this.findOne(id);
  }

  async delete(id: number) {
    const removedUser = this.findOne(id);
    await this.usersRepository.delete(id);
    return removedUser;
  }
}
