import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UsersService, PublicUser } from './users.service.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from './entities/role.enum.js';

@Controller('users')
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<PublicUser[]> {
    return this.usersService.findAll();
  }

  @Patch(':id/role')
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<PublicUser> {
    return this.usersService.updateRole(id, dto.role);
  }
}
