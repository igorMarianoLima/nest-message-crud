import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@UseGuards(AuthTokenGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(
    @Query()
    queryParams: PaginationDto,
  ) {
    return this.messageService.findAll(queryParams);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.messageService.findOne(id);
  }

  @Post()
  create(
    @Body()
    payload: CreateMessageDto,
    @User() user: TokenPayloadDto,
  ) {
    return this.messageService.create({ payload, user });
  }

  @Patch(':id')
  update(
    @Body()
    payload: UpdateMessageDto,

    @Param('id')
    id: string,
  ) {
    return this.messageService.update({
      id,
      body: payload,
    });
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,

    @User() user: TokenPayloadDto,
  ) {
    return this.messageService.remove({ id, user });
  }
}
