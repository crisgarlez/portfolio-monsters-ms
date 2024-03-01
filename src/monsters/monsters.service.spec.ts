import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query, Document } from 'mongoose';

import { MonstersService } from './monsters.service';
import { Monster, MonsterDocument, MonsterSchema } from './monster.schema';
import { ObjectId } from 'mongodb';

// I'm lazy and like to have functions that can be re-used to deal with a lot of my initialization/creation logic
const mockMonster = (
  name = 'Ventus',
  attack = 100,
  defense = 80,
  hp = 100,
  speed = 20,
  imageUrl = 'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
  code = '1234',
  typeCode = '5678',
): Monster => ({
  name,
  attack,
  defense,
  hp,
  speed,
  imageUrl,
  code,
  typeCode,
});

// Mock del modelo de mongoose
const mockMonsterModel = {
  constructor: jest.fn().mockResolvedValue(mockMonster()),
  new: jest.fn().mockResolvedValue(mockMonster()),
  save: jest.fn().mockResolvedValue(mockMonster()),
  find: jest.fn(),
  findById: jest.fn().mockReturnThis(),
  findOne: jest.fn(),
  // update: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  // findOneAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn().mockReturnThis(),
  findOneAndRemove: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),

  exec: jest.fn(),
};

// still lazy, but this time using an object instead of multiple parameters
const mockMonsterDocument = (mock?: Partial<Monster>): Partial<Monster> => ({
  name: mock?.name || 'Ventus',
  attack: mock?.attack || 100,
  defense: mock?.defense || 80,
  hp: mock?.hp || 100,
  speed: mock?.speed || 20,
  imageUrl:
    mock?.imageUrl ||
    'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
  code: mock?.code || '1234',
  typeCode: mock?.typeCode || '5678',
});

const monsterArray = [
  mockMonster(),
  mockMonster(
    'Test',
    90,
    60,
    500,
    30,
    'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
    '1234',
    '5678',
  ),
];

const monsterDocumentArray: Partial<MonsterDocument>[] = [
  mockMonsterDocument(),
  mockMonsterDocument({
    name: 'Test',
    attack: 90,
    defense: 60,
    hp: 500,
    speed: 30,
    imageUrl:
      'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
    code: '1234',
    typeCode: '5678',
  }),
];

describe('MonstersService', () => {
  let service: MonstersService;
  let model: Model<Monster>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonstersService,
        {
          provide: getModelToken(Monster.name),
          useValue: mockMonsterModel,
        },
      ],
    }).compile();

    service = module.get<MonstersService>(MonstersService);
    model = module.get<Model<Monster>>(getModelToken(Monster.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all monsters', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(monsterDocumentArray),
      } as unknown as Query<MonsterDocument[], MonsterDocument>);

      const monsters = await service.findAll();

      expect(monsters).toEqual(monsterArray);
    });
  });

  describe('findById', () => {
    it('should getOne by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<Query<MonsterDocument, MonsterDocument>>({
          exec: jest.fn().mockResolvedValueOnce(
            mockMonsterDocument({
              name: 'Test',
              attack: 90,
              defense: 60,
              hp: 500,
              speed: 30,
              imageUrl:
                'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
              code: '1234',
              typeCode: '5678',
            }),
          ),
        }),
      );
      const findMockMonster = mockMonster(
        'Test',
        90,
        60,
        500,
        30,
        'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
        '1234',
        '5678',
      );
      const foundMonster = await service.findById('458');
      expect(foundMonster).toEqual(findMockMonster);
    });
  });

  describe('findOneByCode', () => {
    it('should get one by code', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce(
        createMock<Query<MonsterDocument, MonsterDocument>>({
          exec: jest.fn().mockResolvedValueOnce(
            mockMonsterDocument({
              name: 'Test',
              attack: 90,
              defense: 60,
              hp: 500,
              speed: 30,
              imageUrl:
                'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
              code: '1234',
              typeCode: '5678',
            }),
          ),
        }),
      );
      const findMockMonster = mockMonster(
        'Test',
        90,
        60,
        500,
        30,
        'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
        '1234',
        '5678',
      );
      const foundMonster = await service.findOneByCode({ code: '1234' });
      expect(foundMonster).toEqual(findMockMonster);
    });
  });

  describe('create', () => {
    it('should insert a new monster', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          name: 'Test',
          attack: 90,
          defense: 60,
          hp: 500,
          speed: 30,
          imageUrl:
            'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
          code: '1234',
          typeCode: '5678',
        } as any),
      );

      // jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve());
      const newCat = await service.create({
        name: 'Test',
        attack: 90,
        defense: 60,
        hp: 500,
        speed: 30,
        imageUrl:
          'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
        code: '1234',
        typeCode: '5678',
      });
      expect(newCat).toEqual(
        mockMonster(
          'Test',
          90,
          60,
          500,
          30,
          'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
          '1234',
          '5678',
        ),
      );
    });
  });

  describe('update', () => {
    it('should update a monster successfully', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
        createMock<Query<MonsterDocument, MonsterDocument>>({
          exec: jest.fn().mockResolvedValueOnce(
            mockMonsterDocument({
              name: 'Test',
              attack: 90,
              defense: 60,
              hp: 500,
              speed: 30,
              imageUrl:
                'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
              code: '1234',
              typeCode: '5678',
            }),
          ),
        }),
      );
      const updatedMonster = await service.update('asdasd', {
        name: 'Test',
        attack: 90,
        defense: 60,
        hp: 500,
        speed: 30,
        imageUrl:
          'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
        // code: '1234',
        typeCode: '5678',
      });
      expect(updatedMonster).toEqual(
        mockMonster(
          'Test',
          90,
          60,
          500,
          30,
          'https://fsl-assessment-public-files.s3.amazonaws.com/assessment-cc-01/dead-unicorn.png',
          '1234',
          '5678',
        ),
      );
    });
  });

  describe('remove', () => {
    it('should delete a monster successfully', async () => {
      jest.spyOn(model, 'findByIdAndRemove').mockReturnThis();
      expect(await service.remove('1234')).toEqual(undefined);
    });
  });
});
