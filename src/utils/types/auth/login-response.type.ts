import { Customer } from 'src/modules/customers/entities/customer.entity';

export type LoginResponseType = Readonly<{
  customer: Partial<Customer>;
}>;

export type LoginSuccessfulResponseType = Readonly<{
  customer: Customer;
  token: string;
}>;
