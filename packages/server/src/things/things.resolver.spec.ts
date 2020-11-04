import { Test, TestingModule } from '@nestjs/testing';
import { ThingsResolver } from './things.resolver';

describe('ThingsResolver', () => {
  let resolver: ThingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThingsResolver],
    }).compile();

    resolver = module.get<ThingsResolver>(ThingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
