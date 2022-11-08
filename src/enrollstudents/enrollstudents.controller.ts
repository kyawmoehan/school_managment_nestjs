import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EnrollstudentsService } from './enrollstudents.service';
import { CreateEnrollstudentDto } from './dto/create-enrollstudent.dto';
import { UpdateEnrollstudentDto } from './dto/update-enrollstudent.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Studnet Enroll Class')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrollstudents')
export class EnrollstudentsController {
  constructor(private readonly enrollstudentsService: EnrollstudentsService) { }

  @Post()
  create(@Body() createEnrollstudentDto: CreateEnrollstudentDto) {
    return this.enrollstudentsService.create(createEnrollstudentDto);
  }

  @Get()
  findAll() {
    return this.enrollstudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollstudentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollstudentDto: UpdateEnrollstudentDto) {
    return this.enrollstudentsService.update(+id, updateEnrollstudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollstudentsService.remove(+id);
  }
}
