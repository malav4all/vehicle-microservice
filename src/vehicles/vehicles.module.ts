import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle, VehicleSchema } from './vehicles.schema';
import { Driver, DriverSchema } from './driver.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }, { name: Driver.name, schema: DriverSchema }, ])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}