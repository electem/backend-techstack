/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Blob } from 'buffer';

@Table
export class Image extends Model {
  @Column
  primarykey: true;
  id: number;
  @Column
  originalname: string;
  @Column(Sequelize.BLOB('long'))
  filename: Blob;
}
