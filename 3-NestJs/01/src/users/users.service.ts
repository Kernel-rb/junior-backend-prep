import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'kernel',
      email: 'kernel@gmail.com',
      status: 'online',
    },
    {
      id: 2,
      name: 'root',
      email: 'root@gmail.com',
      status: 'offline',
    },
    {
      id: 3,
      name: 'leo',
      email: 'leo@mail.com',
      status: 'afk',
    },
    {
      id: 4,
      name: 'james',
      email: 'k@gmail.com',
      status: 'online',
    },
    {
      id: 5,
      name: 'jane',
      email: 'a@fnb?.com',
      status: 'offline',
    },
    {
      id: 6,
      name: 'doe',
      email: 'doe@mac.cl',
      status: 'afk',
    },
  ];

  findAll(role?: 'online' | 'offline' | 'afk') {
    if (role) {
      const statusArr = this.users.filter((user) => user.status === role);
      if (statusArr.length === 0) throw new NotFoundException("0 userss")
      return statusArr;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException("User Not found !!")
    return user;
  }

  create(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id++,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userUpdate:  UpdateUserDto) {
      this.users = this.users.map(
          user => {
              if (user.id == id) {
                    return { ...user, ...userUpdate };
              }
              return user;
          })  
      return this.findOne(id)
    }
    

  delete(id: number) {
      const deletedUser = this.findOne(id);
      this.users = this.users.filter(user => user.id !== id);
      return deletedUser;
    }

}
