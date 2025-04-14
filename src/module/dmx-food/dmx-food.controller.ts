/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { GrpcStreamCall, MessagePattern, Payload } from '@nestjs/microservices';
import { DmxFoodService } from './dmx-food.service';
import { UpdateDmxFoodDto } from './dto/update-dmx-food.dto';
import { ServerWritableStream } from '@grpc/grpc-js';
import {
  CreateDmxFoodRequest,
  CreateDmxFoodResponse,
} from 'src/types/dmx_food.type';

@Controller()
export class DmxFoodController {
  constructor(private readonly dmxFoodService: DmxFoodService) {}

  @GrpcStreamCall('DmxFoodService', 'createDmxFood')
  create(
    requestStream: ServerWritableStream<
      CreateDmxFoodRequest,
      CreateDmxFoodResponse
    >,
  ) {
    requestStream.on('data', (message) => {
      console.log(message);
      requestStream.write({
        log: 'Started',
      });

      void this.dmxFoodService.create(requestStream, message);
    });
  }

  @MessagePattern('findAllDmxFood')
  findAll() {
    return this.dmxFoodService.findAll();
  }

  @MessagePattern('findOneDmxFood')
  findOne(@Payload() id: number) {
    return this.dmxFoodService.findOne(id);
  }

  @MessagePattern('updateDmxFood')
  update(@Payload() updateDmxFoodDto: UpdateDmxFoodDto) {
    // return this.dmxFoodService.update(updateDmxFoodDto.id, updateDmxFoodDto);
  }

  @MessagePattern('removeDmxFood')
  remove(@Payload() id: number) {
    return this.dmxFoodService.remove(id);
  }
}
