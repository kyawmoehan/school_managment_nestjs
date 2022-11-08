import { Test, TestingModule } from '@nestjs/testing';
import { EnrollstudentsService } from './enrollstudents.service';

describe('EnrollstudentsService', () => {
  let service: EnrollstudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollstudentsService],
    }).compile();

    service = module.get<EnrollstudentsService>(EnrollstudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
