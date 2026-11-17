import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MenuCategoriesService } from './menu-categories.service.js';
import { MenuCategoryEntity } from './entities/menu-category.entity.js';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto.js';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto.js';
import { Public } from '../auth/decorators/public.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../users/entities/role.enum.js';

@Controller('menu-categories')
export class MenuCategoriesController {
  constructor(private readonly categoriesService: MenuCategoriesService) {}

  @Public()
  @Get()
  findAll(): Promise<MenuCategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<MenuCategoryEntity> {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateMenuCategoryDto): Promise<MenuCategoryEntity> {
    return this.categoriesService.create(dto);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMenuCategoryDto,
  ): Promise<MenuCategoryEntity> {
    return this.categoriesService.update(id, dto);
  }

  @Roles(Role.CHEF, Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.categoriesService.remove(id);
  }
}
