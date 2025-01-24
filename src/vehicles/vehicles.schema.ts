import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Driver } from './driver.schema';

@Schema()
export class Vehicle extends Document {
  @Prop({ required: true })
  vehiclename: string;

  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driverId: Driver;

  @Prop({ required: true })
  imei: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  camera: string;

  @Prop({ required: false })
  gpsInstallDate: string;

  @Prop({ required: false })
  gpsUpdateDate: string;

  @Prop({ required: true })
  vehtype: string;

  @Prop({ required: true })
  clientId: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
