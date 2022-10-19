import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../model/product';

@Entity()
export class Resources {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  FirstName!: string;

  @Column()
  LastName!: string;

  @Column()
  // eslint-disable-next-line @typescript-eslint/ban-types
  Email!: String;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type: any) => Product, (product: Product) => product.resource)
  Product!: Array<Product>;

  files?: string[];
}
