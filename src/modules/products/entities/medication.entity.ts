import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { SubCategory } from './subCategories.entity';

@Entity()
export class Medication extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column()
  price: number;

  @ManyToMany(() => SubCategory, (subCategory) => subCategory.medications)
  subCategories?: SubCategory[];

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
