import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SchoolgradesService } from './schoolgrades.service';
import { CreateSchoolgradeDto } from './dto/create-schoolgrade.dto';
import { UpdateSchoolgradeDto } from './dto/update-schoolgrade.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('School Grade')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schoolgrades')
export class SchoolgradesController {
  constructor(private readonly schoolgradesService: SchoolgradesService) { }

  @Post()
  create(@Body() createSchoolgradeDto: CreateSchoolgradeDto) {
    return this.schoolgradesService.create(createSchoolgradeDto);
  }

  @Get()
  findAll() {
    return this.schoolgradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoolgradesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSchoolgradeDto: UpdateSchoolgradeDto) {
    return this.schoolgradesService.update(id, updateSchoolgradeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schoolgradesService.remove(id);
  }
}
