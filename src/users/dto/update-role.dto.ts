import { IsEnum } from 'class-validator';
import { Role } from '../entities/role.enum.js';

export class UpdateRoleDto {
  @IsEnum(Role)
  readonly role: Role;
}
