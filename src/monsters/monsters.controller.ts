import {
  ClassSerializerInterceptor,
  Controller,
  Logger,
  ParseUUIDPipe,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  CreateMonsterDto,
  FindByCodeDto,
  UpdateMonsterDto,
} from './monster.dto';
import { CustomRpcExceptionFilter } from '../common/filters/custom-rpc-exception.filter';
import { Monster } from './monster.schema';

@Controller('monsters')
export class MonstersController {
  private readonly logger = new Logger(MonstersController.name);

  constructor(private readonly monstersService: MonstersService) {}

  @MessagePattern('get-all-monsters')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllMonsters(): Promise<Monster[]> {
    this.logger.debug('getAllMonsters...');

    const monsters = await this.monstersService.findAll();

    return monsters.map(
      (monster) =>
        new Monster({
          _id: monster?._id,
          attack: monster?.attack,
          code: monster?.code,
          defense: monster?.defense,
          hp: monster?.hp,
          imageUrl: monster?.imageUrl,
          name: monster?.name,
          speed: monster?.speed,
          typeCode: monster?.typeCode,
        }),
    );
  }

  @UseFilters(new CustomRpcExceptionFilter())
  @MessagePattern('find-monster-by-code')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new RpcException(errors);
      },
    }),
  )
  async findMonsterByCode(@Payload() payload: FindByCodeDto): Promise<Monster> {
    this.logger.debug('findMonsterByCode...');

    const monster = await this.monstersService.findOneByCode(payload);

    return new Monster({
      _id: monster?._id,
      attack: monster?.attack,
      code: monster?.code,
      defense: monster?.defense,
      hp: monster?.hp,
      imageUrl: monster?.imageUrl,
      name: monster?.name,
      speed: monster?.speed,
      typeCode: monster?.typeCode,
    });
  }

  @UseFilters(new CustomRpcExceptionFilter())
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new RpcException(errors);
      },
    }),
  )
  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('create-monster')
  async createMonster(@Payload() payload: CreateMonsterDto) {
    this.logger.debug('createMonster...');

    const monster = await this.monstersService.create(payload);

    return new Monster({
      _id: monster?._id,
      attack: monster?.attack,
      code: monster?.code,
      defense: monster?.defense,
      hp: monster?.hp,
      imageUrl: monster?.imageUrl,
      name: monster?.name,
      speed: monster?.speed,
      typeCode: monster?.typeCode,
    });
  }

  @UseFilters(new CustomRpcExceptionFilter())
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new RpcException(errors);
      },
    }),
  )
  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('update-monster')
  async updateMonster(
    @Payload(
      'code',
      new ParseUUIDPipe({
        exceptionFactory: (errors) => {
          return new RpcException(errors);
        },
      }),
    )
    code: string,
    @Payload('payload') payload: UpdateMonsterDto,
  ): Promise<Monster> {
    this.logger.debug('updateMonster...');

    const monster = await this.monstersService.update(code, payload);

    return new Monster({
      _id: monster?._id,
      attack: monster?.attack,
      code: monster?.code,
      defense: monster?.defense,
      hp: monster?.hp,
      imageUrl: monster?.imageUrl,
      name: monster?.name,
      speed: monster?.speed,
      typeCode: monster?.typeCode,
    });
  }

  @UseFilters(new CustomRpcExceptionFilter())
  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('delete-monster-by-code')
  async deleteMonsterByCode(
    @Payload(
      'code',
      new ParseUUIDPipe({
        exceptionFactory: (errors) => {
          return new RpcException(errors);
        },
      }),
    )
    code: string,
  ) {
    this.logger.debug('deleteMonsterByCode...');

    const monster = await this.monstersService.remove(code);

    return new Monster({
      _id: monster?._id,
      attack: monster?.attack,
      code: monster?.code,
      defense: monster?.defense,
      hp: monster?.hp,
      imageUrl: monster?.imageUrl,
      name: monster?.name,
      speed: monster?.speed,
      typeCode: monster?.typeCode,
    });
  }
}
