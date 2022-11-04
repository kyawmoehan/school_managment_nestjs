import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SchoollevelsService } from './schoollevels.service';
import { CreateSchoollevelDto } from './dto/create-schoollevel.dto';
import { UpdateSchoollevelDto } from './dto/update-schoollevel.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('School Level')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schoollevels')
export class SchoollevelsController {
  constructor(private readonly schoollevelsService: SchoollevelsService) { }

  @Post()
  create(@Body() createSchoollevelDto: CreateSchoollevelDto) {
    return this.schoollevelsService.create(createSchoollevelDto);
  }

  @Get()
  findAll() {
    return this.schoollevelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoollevelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSchoollevelDto: UpdateSchoollevelDto) {
    return this.schoollevelsService.update(id, updateSchoollevelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schoollevelsService.remove(id);
  }
}
