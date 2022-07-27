import { Injectable } from '@nestjs/common';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class AutoPuncher extends Model {
  @Column
  username: string;

  @Column
  sheetKey: string;

  @Column(DataType.JSON)
  credential: object;

  @Column
  onWorkTime: string;

  @Column
  offWorkTime: string;

  @Column
  workHours: string;

  @Column
  crontabString: string;
}
