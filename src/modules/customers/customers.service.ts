import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  create(createProfileDto: CreateCustomerDto): Promise<Customer> {
    return this.customersRepository.save(
      this.customersRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Customer[]> {
    return this.customersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Customer>): Promise<NullableType<Customer>> {
    return this.customersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, payload: DeepPartial<Customer>): Promise<Customer> {
    return this.customersRepository.save(
      this.customersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.customersRepository.softDelete(id);
  }
}
