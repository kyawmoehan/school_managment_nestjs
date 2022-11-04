import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SchoolclassesService } from './schoolclasses.service';
import { CreateSchoolclassDto } from './dto/create-schoolclass.dto';
import { UpdateSchoolclassDto } from './dto/update-schoolclass.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('School Class')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schoolclasses')
export class SchoolclassesController {
  constructor(private readonly schoolclassesService: SchoolclassesService) { }

  @Post()
  create(@Body() createSchoolclassDto: CreateSchoolclassDto) {
    return this.schoolclassesService.create(createSchoolclassDto);
  }

  @Get()
  findAll() {
    return this.schoolclassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoolclassesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSchoolclassDto: UpdateSchoolclassDto) {
    return this.schoolclassesService.update(id, updateSchoolclassDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schoolclassesService.remove(id);
  }
}
