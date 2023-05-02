import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Status } from 'src/modules/statuses/entities/status.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/modules/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Customer extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  phoneNumber: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  otp: string | null;

  @Column({ default: AuthProvidersEnum.phoneNumber })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
