import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { createApiResponse } from 'src/comman/utilis/response.util';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = await this.vehiclesService.create(createVehicleDto);
      return createApiResponse(
        true,
        HttpStatus.CREATED,
        'Vehicle created successfully',
        vehicle,
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to create vehicle',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      const result = await this.vehiclesService.findAll(+page, +limit);
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Vehicles retrieved successfully',
        result.data,
        result.total,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to retrieve vehicles',
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async search(
    @Query('searchText') searchText: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    try {
      console.log({ searchText });
      const result = await this.vehiclesService.search(
        searchText,
        +page,
        +limit,
      );
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Vehicles retrieved successfully',
        result.data,
        result.total,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to search vehicles',
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const vehicle = await this.vehiclesService.findOne(id);
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Vehicle retrieved successfully',
        vehicle,
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.NOT_FOUND,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Vehicle not found',
        ),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    try {
      const vehicle = await this.vehiclesService.update(id, updateVehicleDto);
      return createApiResponse(
        true,
        HttpStatus.OK,
        'Vehicle updated successfully',
        vehicle,
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.BAD_REQUEST,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Failed to update vehicle',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.vehiclesService.delete(id);
      return createApiResponse(
        true,
        HttpStatus.NO_CONTENT,
        'Vehicle deleted successfully',
      );
    } catch (error) {
      throw new HttpException(
        createApiResponse(
          false,
          HttpStatus.NOT_FOUND,
          error.message,
          undefined,
          undefined,
          undefined,
          undefined,
          'Vehicle not found',
        ),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
