import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  sheetKey: string;

  @Column
  onWorkTime: string;

  @Column
  offWorkTime: string;

  @Column
  workHours: string;

  @Column
  crontabString: string;
}
