import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AutoPuncherRepository } from './auto_puncher.repository';
import { GoogleSpreadsheet } from 'google-spreadsheet';
const nodeMailer = require('nodemailer');

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
      result['dataValues']['email'] = userData['email'];
      const cleanResult = result['dataValues'];
      const userWorkDays = cleanResult['crontabString'].split(',');
      const today = new Date().getDay().toString();
      if (!userWorkDays.includes(today)) continue;

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
      this.sendMail(
        cleanResult['email'],
        cleanResult['username'],
        cleanResult['sheetKey'],
      );
    }
  }

  async sendMail(email, username, sheetKey) {
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.APP_SECRET,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_HOST,
      to: email,
      subject: '打卡囉！',
      text: `${username} 您好，今天是${JSON.stringify(
        new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      )
        .replace('"', '')
        .replace(
          '"',
          '',
        )}\n已完成打卡，若要取消打卡，請至您的試算表刪除紀錄\nhttps://docs.google.com/spreadsheets/d/${sheetKey}/`,
    });
  }

  async checkCredential(credential, sheetKey) {
    try {
      const doc = new GoogleSpreadsheet(sheetKey);
      await doc.useServiceAccountAuth(credential);
      await doc.useServiceAccountAuth({
        client_email: credential.client_email,
        private_key: credential.private_key,
      });
      await doc.useServiceAccountAuth(credential, credential.client_email);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      await sheet.loadCells('A1:D1000');
      const res = sheet.getCell(1, 1);
    } catch (error) {
      try {
        error['response']['status'];
      } catch (e) {
        return { success: false, code: 1021 };
      }
      // 目前的情況是：非「credential 無效」則「sheetKey 無效」
      return { success: false, code: 1020 };
    }
    return { success: true };
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
