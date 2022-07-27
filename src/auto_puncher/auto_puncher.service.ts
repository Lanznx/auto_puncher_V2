import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AutoPuncherRepository } from './auto_puncher.repository';
import { GoogleSpreadsheet } from 'google-spreadsheet';
@Injectable()
export class AutoPuncherService {
  constructor(
    private autoPuncherRepository: AutoPuncherRepository,
    private user: UserRepository,
  ) {}

  async punchAllUserSheet() {
    const subscribeUsersData = await this.user.getAllSubscribedUsers();

    for await (const userData of subscribeUsersData) {
      const result = await this.autoPuncherRepository.getRecord(
        userData['dataValues']['username'],
      );

      // TO-DO:
      // 1. identify crontab string
      result['dataValues']['email'] = userData['email'];
      const cleanResult = result['dataValues'];
      console.log(cleanResult);
      const creds = cleanResult['credential'];
      const doc = new GoogleSpreadsheet(cleanResult['sheetKey']);
      await doc.useServiceAccountAuth(creds);
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.useServiceAccountAuth(creds, creds.client_email);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      await sheet.loadCells('A1:D1000');
      for (let index = 0; index < 1000; index++) {
        const emptyCell = sheet.getCell(index, 1);
        console.log(emptyCell);
        if (emptyCell['_rawData']['formattedValue'] === undefined) {
          emptyCell.value = 'hello world';
          sheet.getCell(index, 0).value = JSON.stringify(
            new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
          )
            .replace('"', '')
            .replace('"', '');
          sheet.getCell(index, 1).value = cleanResult['onWorkTime'].replace(
            "'",
            '',
          );
          sheet.getCell(index, 2).value = cleanResult['offWorkTime'];
          sheet.getCell(index, 3).value = cleanResult['workHours'];
          await sheet.saveUpdatedCells();
          console.log('punched!');
          break;
        }
      }
    }
  }

  async addRecord(record) {
    const result = await this.autoPuncherRepository.addRecord(
      record,
      record.tokenData.username,
    );
    return { success: true, data: result };
  }

  async getRecord(username) {
    const result = await this.autoPuncherRepository.getRecord(username);
    return { success: true, data: result };
  }

  updateRecord(record) {
    this.autoPuncherRepository.updateRecord(record);

    return { success: true, message: 'updated successfully' };
  }

  async deleteRecord(username) {
    const result = await this.autoPuncherRepository.deleteRecord(username);
    if (result !== 0) {
      return { success: true, message: 'deleted successfully' };
    }
    return { success: false, message: 'already deleted' };
  }
}
