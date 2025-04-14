import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
