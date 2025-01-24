import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
  } from 'class-validator';

  
  export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    vehiclename: string;
  
    @IsString()
  @IsNotEmpty()
  driverId: string; 
  
    @IsString()
    @IsNotEmpty()
    imei: string;
  
    @IsString()
    @IsNotEmpty()
    type: string;
  
    @IsString()
    @IsOptional()
    camera: string;
  
    @IsString()
    @IsOptional()
    gpsInstallDate: string;
  
    @IsString()
    @IsOptional()
    gpsUpdateDate: string;
  
    @IsString()
    @IsNotEmpty()
    vehtype: string;
  
    @IsString()
    @IsNotEmpty()
    clientId: string;
  }