import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsEmail()
  readonly from: string;

  @IsString()
  @IsEmail()
  readonly to: string;

  @IsString()
  @MinLength(5)
  readonly content: string;
}
