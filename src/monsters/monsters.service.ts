import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Monster } from './monster.schema';
import {
  CreateMonsterDto,
  FindByCodeDto,
  UpdateMonsterDto,
} from './monster.dto';

@Injectable()
export class MonstersService {
  private readonly logger = new Logger(MonstersService.name);

  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
  ) {}

  async findAll(): Promise<Monster[]> {
    this.logger.debug('findAll...');
    return this.monsterModel.find().exec();
  }

  async findById(id: string): Promise<Monster> {
    return this.monsterModel.findById(id).exec();
  }

  async findOneByCode(data: FindByCodeDto): Promise<Monster> {
    this.logger.debug('findOneByCode...');
    return this.monsterModel
      .findOne({
        code: data.code,
      })
      .exec();
  }

  async create(monsterData: CreateMonsterDto): Promise<Monster> {
    this.logger.debug('create...');
    return this.monsterModel.create(monsterData);
  }

  async update(
    code: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster> {
    this.logger.debug('update...');
    return this.monsterModel
      .findOneAndUpdate({ code: code }, updateMonsterDto, { new: true })
      .exec();
  }

  async remove(code: string): Promise<Monster> {
    this.logger.debug('remove...');
    return this.monsterModel.findOneAndDelete({ code: code }).exec();
  }
}
