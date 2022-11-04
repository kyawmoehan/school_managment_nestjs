import { Test, TestingModule } from '@nestjs/testing';
import { SchoolclassesService } from './schoolclasses.service';

describe('SchoolclassesService', () => {
  let service: SchoolclassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolclassesService],
    }).compile();

    service = module.get<SchoolclassesService>(SchoolclassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
