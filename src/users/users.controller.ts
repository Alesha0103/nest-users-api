import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id") // GET /users/:id
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id); // +id is the same as Number(id)
  }

  @Post() // POST /users
  create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Patch(":id") // PATCH /users/:id
  update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDTO);
  }

  @Delete(":id") //DELETE /users/:id
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
