import { Test, TestingModule } from '@nestjs/testing';
import { EmailMarketerController } from '../email-marketer.controller';

describe('EmailMarketerController', () => {
  let controller: EmailMarketerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailMarketerController],
    }).compile();

    controller = module.get<EmailMarketerController>(EmailMarketerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
