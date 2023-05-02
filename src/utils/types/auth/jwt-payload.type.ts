import { Customer } from 'src/modules/customers/entities/customer.entity';

export type JwtPayloadType = Pick<Customer, 'id' | 'role'> & {
  iat: number;
  exp: number;
};
