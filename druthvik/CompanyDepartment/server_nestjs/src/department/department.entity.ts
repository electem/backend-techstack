import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from 'src/company/company.entity';
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((_type) => Company, (company) => company.department)
  company!: Company[];
}
