import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    },
    {
      id: 2,
      name: 'Alice Caeiro',
      email: 'alicecaeiro@gmail.com',
    },
    {
      id: 3,
      name: 'Who Knows',
      email: 'whoknows@gmail.com',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const newUser = { ...createUserDto, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.users.filter((user) => user.id !== id);
  }
}
