import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Customer } from 'src/modules/customers/entities/customer.entity';

@Entity()
export class Address extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, {
    eager: true,
  })
  customer: Customer;

  @Column({ type: String, nullable: false })
  zipCode: string;

  @Column({ type: String, nullable: false })
  address1: string;

  @Column({ type: String, nullable: true })
  address2: string | null;

  @Column({ type: String, nullable: false })
  lat: number;

  @Column({ type: String, nullable: false })
  lng: number;

  @Column({ type: String, nullable: false })
  country: string;

  @Column({ type: String, nullable: false })
  city: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
