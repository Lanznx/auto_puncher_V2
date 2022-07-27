import { Test, TestingModule } from '@nestjs/testing';
import { AutoPuncherService } from './auto_puncher.service';

describe('AutoPuncherService', () => {
  let service: AutoPuncherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoPuncherService],
    }).compile();

    service = module.get<AutoPuncherService>(AutoPuncherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
