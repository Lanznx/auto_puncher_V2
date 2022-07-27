import { Inject, Injectable } from '@nestjs/common';
import { AutoPuncher } from '../entity/auto_puncher.entity';

@Injectable()
export class AutoPuncherRepository {
  constructor(@Inject('AutoPuncher') private autoPuncher: typeof AutoPuncher) {}

  async addRecord(record, username) {
    const result = this.autoPuncher.create({
      username: username,
      sheetKey: record.sheetKey,
      credential: record.credential,
      onWorkTime: record.onWorkTime,
      offWorkTime: record.offWorkTime,
      workHours: record.workHours,
      crontabString: record.crontabString,
    });

    return result;
  }

  async getRecord(username) {
    const result = await this.autoPuncher.findOne({
      where: { username: username },
    });

    return result;
  }

  async updateRecord(record) {
    const result = await this.autoPuncher.update(
      {
        sheetKey: record.sheetKey,
        credential: record.credential,
        onWorkTime: record.onWorkTime,
        offWorkTime: record.offWorkTime,
        workHours: record.workHours,
        crontabString: record.crontabString,
      },
      { where: { username: record.tokenData.username } },
    );

    return result;
  }

  async deleteRecord(username) {
    const result = await this.autoPuncher.destroy({
      where: { username: username },
    });

    return result;
  }
}
