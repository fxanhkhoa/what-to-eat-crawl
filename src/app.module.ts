import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DmxFoodModule } from './module/dmx-food/dmx-food.module';
import { IngredientModule } from './module/ingredient/ingredient.module';

@Module({
  imports: [DmxFoodModule, IngredientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
