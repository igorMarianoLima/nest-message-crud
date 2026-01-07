import {
  IsIn,
  IsInt,
  IsIP,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { METHODS } from 'http';

export class CreateLogDto {
  @IsUUID()
  requestId: string;

  @IsIP()
  ip: string;

  @IsIn(METHODS)
  method: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  payload?: string;

  @IsInt()
  status: number;

  @IsNumber()
  @IsPositive()
  duration: number;
}
