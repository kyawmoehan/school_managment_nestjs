import { Controller, Get, Query, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get()
  getFile(@Query('path') path: string, @Res() res: any) {
    const file = createReadStream(join(process.cwd(), path));
    file.pipe(res);
  }
}
