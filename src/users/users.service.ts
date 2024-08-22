import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Oleksii 1",
      "email": "test1@gmail.com",
      "role": "ADMIN",
    },
    {
      "id": 2,
      "name": "Oleksii 2",
      "email": "test2@gmail.com",
      "role": "INTERN",
    },
    {
      "id": 3,
      "name": "Oleksii 3",
      "email": "test3@gmail.com",
      "role": "INTERN",
    },
    {
      "id": 4,
      "name": "Oleksii 4",
      "email": "test4@gmail.com",
      "role": "INTERN",
    },
    {
      "id": 5,
      "name": "Oleksii 5",
      "email": "test5@gmail.com",
      "role": "INTERN",
    },
  ];

  findAll(role?: "INTERN" | "ENGINEER" | "ADNIM") {
    if (role) {
      const rolesArray = this.users.filter(user => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException("User Role Not Found")
      }
      return rolesArray;
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException("User Not Found");
    }
    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const usersByHighestId = [ ...this.users ].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDTO
    }
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDTO: UpdateUserDTO) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUserDTO };
      }
      return user;
    })
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }
}
