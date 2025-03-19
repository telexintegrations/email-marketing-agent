import { Test, TestingModule } from '@nestjs/testing';
import { EmailMarketerService } from '../email-marketer.service';

describe('EmailMarketerService', () => {
  let service: EmailMarketerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailMarketerService],
    }).compile();

    service = module.get<EmailMarketerService>(EmailMarketerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
