import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'graham@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Daryl Estrada',
      email: 'daryl@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Gabby Boi',
      email: 'gabby@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Jersel TV',
      email: 'jersel@gmail.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Jovan Nitang',
      email: 'jovan@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN' | 'USER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException(`No role ${role} found`);
      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
