import { Test, TestingModule } from '@nestjs/testing';
import { SchoolgradesService } from './schoolgrades.service';

describe('SchoolgradesService', () => {
  let service: SchoolgradesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolgradesService],
    }).compile();

    service = module.get<SchoolgradesService>(SchoolgradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
