import { PartialType } from '@nestjs/mapped-types';
import { CreateDmxFoodDto } from './create-dmx-food.dto';

export class UpdateDmxFoodDto extends PartialType(CreateDmxFoodDto) {
  id: number;
}
