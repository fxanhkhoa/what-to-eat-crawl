import { Test, TestingModule } from '@nestjs/testing';
import { DmxFoodService } from './dmx-food.service';

describe('DmxFoodService', () => {
  let service: DmxFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmxFoodService],
    }).compile();

    service = module.get<DmxFoodService>(DmxFoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
