import { Test, TestingModule } from '@nestjs/testing';
import { AutoPuncherController } from './auto_puncher.controller';

describe('AutoPuncherController', () => {
  let controller: AutoPuncherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoPuncherController],
    }).compile();

    controller = module.get<AutoPuncherController>(AutoPuncherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
