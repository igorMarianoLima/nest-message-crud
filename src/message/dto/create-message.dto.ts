import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsUUID()
  readonly to: string;

  @IsString()
  @MinLength(5)
  readonly content: string;
}
