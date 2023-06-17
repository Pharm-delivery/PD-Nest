import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Medication } from './medication.entity';

@Entity()
export class SubCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ default: null, nullable: true })
  logo: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Medication, (medication) => medication.subCategories, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  medications?: Medication[];
}
