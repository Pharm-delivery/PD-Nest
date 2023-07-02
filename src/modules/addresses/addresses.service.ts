import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private customersRepository: Repository<Address>,
  ) {}

  create(
    createProfileDto: CreateAddressDto,
    customerId: number,
  ): Promise<Address> {
    return this.customersRepository.save(
      this.customersRepository.create({
        ...createProfileDto,
        customer: { id: customerId },
      }),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions & { customerId: number },
  ): Promise<Address[]> {
    return this.customersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['customer'],
      loadRelationIds: true,
      where: {
        customer: { id: paginationOptions.customerId },
      },
    });
  }

  findOne(fields: EntityCondition<Address>): Promise<NullableType<Address>> {
    return this.customersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, payload: DeepPartial<Address>): Promise<Address> {
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
