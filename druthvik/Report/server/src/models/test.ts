import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Panel } from './panel';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((_type) => Panel, (panel: Panel) => panel.test)
  panel!: Panel[];
}
