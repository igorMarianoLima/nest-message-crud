import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMessageDto extends PartialType(
  OmitType(CreateMessageDto, ['to']),
) {
  @IsBoolean()
  @IsOptional()
  readonly wasRead?: boolean;
}
