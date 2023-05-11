import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customers/entities/customer.entity';
import { AuthPhoneNumberLoginDto } from './dto/auth-phoneNumber-login.dto';
import { AuthConfirmPhoneNumberDto } from './dto/auth-confirm-phoneNumber.dto';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { StatusEnum } from 'src/modules/statuses/statuses.enum';
import { Status } from 'src/modules/statuses/entities/status.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
// import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { NullableType } from 'src/utils/types/nullable.type';
import {
  LoginResponseType,
  LoginSuccessfulResponseType,
} from 'src/utils/types/auth/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private customerService: CustomersService,
  ) {}

  async validateLogin(
    loginDto: AuthPhoneNumberLoginDto,
  ): Promise<LoginResponseType> {
    await this.customerService.findOne({
      phoneNumber: loginDto.phoneNumber,
    });

    // if (!customer) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         phoneNumber: 'notFound',
    //       },
    //     },
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    // if (customer.provider !== AuthProvidersEnum.phoneNumber) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         phoneNumber: `needLoginViaProvider:${customer.provider}`,
    //       },
    //     },
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    return {
      message: 'OTP sended',
    };
  }

  async register(
    dto: AuthRegisterLoginDto,
  ): Promise<LoginSuccessfulResponseType> {
    const otp = '111111';

    const isValidOtp = dto.otp === otp;

    if (!isValidOtp) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectOTP',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const customer = await this.customerService.create({
      ...dto,
      phoneNumber: dto.phoneNumber,
      role: {
        id: RoleEnum.customer,
      } as Role,
      status: {
        id: StatusEnum.active,
      } as Status,
      otp,
    });

    const token = this.jwtService.sign({
      id: customer.id,
      role: customer.role,
    });

    return { customer, token };
  }

  async confirmPhoneNumber({
    phoneNumber,
    otp,
  }: AuthConfirmPhoneNumberDto): Promise<LoginSuccessfulResponseType> {
    const customer = await this.customerService.findOne({
      phoneNumber,
    });

    if (!customer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidOtp = otp === customer.otp;

    if (!isValidOtp) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectOTP',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: customer.id,
      role: customer.role,
    });
    return { customer, token };
  }

  async me(customer: Customer): Promise<NullableType<Customer>> {
    return this.customerService.findOne({
      id: customer.id,
    });
  }
}
