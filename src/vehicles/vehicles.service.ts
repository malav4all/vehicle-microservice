import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vehicle } from './vehicles.schema';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    try {
      const vehicleData = {
        ...createVehicleDto,
        driverId: new Types.ObjectId(createVehicleDto.driverId), // Convert driverId to ObjectId
      };
      const vehicle = new this.vehicleModel(vehicleData);
      return await vehicle.save();
    } catch (error) {
      throw new Error('Failed to create vehicle: ' + error.message);
    }
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Vehicle[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const total = await this.vehicleModel.countDocuments().exec();
    const data = await this.vehicleModel
      .find()
      .populate('driverId')
      .skip(skip)
      .limit(limit)
      .exec();

    return { data, total, page, limit };
  }

  async search(
    searchText: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Vehicle[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    // Construct search criteria
    const searchCriteria = searchText
      ? {
          $or: [
            { vehiclename: { $regex: searchText, $options: 'i' } },
            { type: { $regex: searchText, $options: 'i' } },
            { vehtype: { $regex: searchText, $options: 'i' } },
            { imei: { $regex: searchText, $options: 'i' } },
          ],
        }
      : {};

    // Fetch total count
    const total = await this.vehicleModel.countDocuments(searchCriteria).exec();

    // Fetch paginated data
    const data = await this.vehicleModel
      .find(searchCriteria)
      .populate('driverId')
      .skip(skip)
      .limit(limit)
      .exec();

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    try {
      // Convert driverId to ObjectId
      if (updateVehicleDto.driverId) {
        updateVehicleDto.driverId = new Types.ObjectId(
          updateVehicleDto.driverId,
        ) as any;
      }

      const updatedVehicle = await this.vehicleModel
        .findByIdAndUpdate(id, updateVehicleDto, { new: true })
        .exec();
      if (!updatedVehicle) {
        throw new NotFoundException(`Vehicle with ID ${id} not found`);
      }
      return updatedVehicle;
    } catch (error) {
      throw new BadRequestException('Failed to update the vehicle');
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }
}
