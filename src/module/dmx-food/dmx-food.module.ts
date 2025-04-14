import { Module } from '@nestjs/common';
import { DmxFoodService } from './dmx-food.service';
import { DmxFoodController } from './dmx-food.controller';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [IngredientModule],
  controllers: [DmxFoodController],
  providers: [DmxFoodService],
})
export class DmxFoodModule {}
