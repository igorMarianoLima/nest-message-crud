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
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,

    private readonly hashingService: HashingService,
  ) {}

  async create(payload: CreatePersonDto) {
    try {
      const passwordHash = await this.hashingService.hash(payload.password);

      const instance = this.personRepository.create({
        ...payload,
        passwordHash,
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

  async findOne(id: string) {
    const person = await this.personRepository.findOneBy({
      id,
    });

    return person;
  }

  async findOneByEmail(email: string) {
    const person = await this.personRepository.findOneBy({
      email,
    });

    return person;
  }

  async update(id: string, payload: UpdatePersonDto) {
    const newData = { ...payload };

    if (payload.password) {
      newData.password = await this.hashingService.hash(payload.password);
    }

    const person = await this.personRepository.preload({
      ...newData,
      passwordHash: newData.password,
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
