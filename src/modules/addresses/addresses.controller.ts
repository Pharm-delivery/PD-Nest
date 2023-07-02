import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/roles/roles.decorator';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { Address } from './entities/address.entity';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiBearerAuth()
@Roles(RoleEnum.customer)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Addresses')
@Controller({
  path: 'addresses',
  version: '1',
})
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProfileDto: CreateAddressDto,
    @Request() request,
  ): Promise<Address> {
    return this.addressesService.create(createProfileDto, request.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Request() request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Address>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.addressesService.findManyWithPagination({
        page,
        limit,
        customerId: request.user.id,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Address>> {
    return this.addressesService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.addressesService.softDelete(id);
  }
}
