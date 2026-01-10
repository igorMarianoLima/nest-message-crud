import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(AuthTokenGuard)
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @Public()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch()
  update(
    @User('sub') userId: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update(userId, updatePersonDto);
  }

  @Delete()
  remove(@User('sub') userId: string) {
    return this.personService.remove(userId);
  }
}
