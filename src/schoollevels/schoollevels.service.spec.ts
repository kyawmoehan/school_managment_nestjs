import { Test, TestingModule } from '@nestjs/testing';
import { SchoollevelsService } from './schoollevels.service';

describe('SchoollevelsService', () => {
  let service: SchoollevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoollevelsService],
    }).compile();

    service = module.get<SchoollevelsService>(SchoollevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
