import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DishesService } from './dishes.service.js';
import { CreateDishDto } from './dto/create-dish.dto.js';
import { UpdateDishDto } from './dto/update-dish.dto.js';
import { QueryDishesDto } from './dto/query-dishes.dto.js';
import { DishEntity } from './entities/dish.entity.js';
import { Paginated } from '../common/interfaces/paginated.interface.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../users/entities/role.enum.js';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Public()
  @Get()
  findAll(@Query() query: QueryDishesDto): Promise<Paginated<DishEntity>> {
    return this.dishesService.findAll(query);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Get('deleted')
  findDeleted(): Promise<DishEntity[]> {
    return this.dishesService.findDeleted();
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<DishEntity> {
    return this.dishesService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<DishEntity> {
    return this.dishesService.findOne(id);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateDishDto): Promise<DishEntity> {
    return this.dishesService.create(dto);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Patch(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string): Promise<DishEntity> {
    return this.dishesService.restore(id);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDishDto,
  ): Promise<DishEntity> {
    return this.dishesService.update(id, dto);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Put(':id')
  replace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDishDto,
  ): Promise<DishEntity> {
    return this.dishesService.update(id, dto);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.dishesService.remove(id);
  }
}
