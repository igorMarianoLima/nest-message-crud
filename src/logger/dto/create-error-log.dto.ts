import { IsIn, IsString, IsUUID } from 'class-validator';
import { METHODS } from 'http';

export class CreateErrorLogDto {
  @IsUUID()
  requestId: string;

  @IsString()
  url: string;

  @IsIn(METHODS)
  method: string;

  @IsString()
  message: string;

  @IsString()
  stack: string;
}
