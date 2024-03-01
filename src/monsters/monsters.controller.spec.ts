import { Test, TestingModule } from '@nestjs/testing';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';
import { getModelToken } from '@nestjs/mongoose';
import { Monster } from './monster.schema';

describe('MonstersController', () => {
  let monstersController: MonstersController;
  let monstersService: MonstersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonstersController],
      providers: [
        MonstersService,
        {
          provide: getModelToken(Monster.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    monstersController = module.get<MonstersController>(MonstersController);
    monstersService = module.get<MonstersService>(MonstersService);
  });

  it('should be defined', () => {
    expect(monstersController).toBeDefined();
  });

  describe('getAllMonsters', () => {
    it('should return an array of monsters', async () => {
      const result: Monster[] = [];
      jest.spyOn(monstersService, 'findAll').mockResolvedValue(result);
      expect(await monstersController.getAllMonsters()).toStrictEqual(result);
    });
  });
});
