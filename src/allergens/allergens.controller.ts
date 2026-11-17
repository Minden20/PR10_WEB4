import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AllergensService } from './allergens.service.js';
import { AllergenEntity } from './entities/allergen.entity.js';
import { CreateAllergenDto } from './dto/create-allergen.dto.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../users/entities/role.enum.js';

@Controller('allergens')
export class AllergensController {
  constructor(private readonly allergensService: AllergensService) {}

  @Public()
  @Get()
  findAll(): Promise<AllergenEntity[]> {
    return this.allergensService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AllergenEntity> {
    return this.allergensService.findOne(id);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAllergenDto): Promise<AllergenEntity> {
    return this.allergensService.create(dto);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.allergensService.remove(id);
  }
}
