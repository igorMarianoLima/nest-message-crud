import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const instance = this.personRepository.create({
        ...createPersonDto,
        passwordHash: createPersonDto.password,
      });

      return await this.personRepository.save(instance);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('E-mail already in use');
      }

      throw err;
    }
  }

  findAll() {
    return this.personRepository.find({
      order: {
        createdAt: {
          direction: 'DESC',
        },
      },
    });
  }

  findOne(id: string) {
    const person = this.personRepository.findOneBy({
      id,
    });

    if (!person) throw new NotFoundException();

    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.personRepository.preload({
      ...updatePersonDto,
      passwordHash: updatePersonDto.password,
      id,
    });

    if (!person) throw new NotFoundException();

    return this.personRepository.save(person);
  }

  async remove(id: string) {
    const person = await this.personRepository.findOneBy({
      id,
    });

    if (!person) throw new NotFoundException();

    return this.personRepository.remove(person);
  }
}
