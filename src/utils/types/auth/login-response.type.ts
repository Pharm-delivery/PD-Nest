import { Customer } from 'src/modules/customers/entities/customer.entity';

export type LoginResponseType = Readonly<{
  message: string;
}>;

export type LoginSuccessfulResponseType = Readonly<{
  customer: Customer;
  token: string;
}>;
