import { Test, TestingModule } from '@nestjs/testing';
import { DmxFoodController } from './dmx-food.controller';
import { DmxFoodService } from './dmx-food.service';

describe('DmxFoodController', () => {
  let controller: DmxFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DmxFoodController],
      providers: [DmxFoodService],
    }).compile();

    controller = module.get<DmxFoodController>(DmxFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
