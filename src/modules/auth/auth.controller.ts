import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPhoneNumberLoginDto } from './dto/auth-phoneNumber-login.dto';
import { AuthConfirmPhoneNumberDto } from './dto/auth-confirm-phoneNumber.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import {
  LoginResponseType,
  LoginSuccessfulResponseType,
} from 'src/utils/types/auth/login-response.type';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { NullableType } from 'src/utils/types/nullable.type';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('phoneNumber/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() loginDto: AuthPhoneNumberLoginDto,
  ): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto);
  }

  @Post('phoneNumber/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() createCustomerDto: AuthRegisterLoginDto,
  ): Promise<LoginSuccessfulResponseType> {
    return this.service.register(createCustomerDto);
  }

  @Post('phoneNumber/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmPhoneNumber(
    @Body() confirmPhoneNumberDto: AuthConfirmPhoneNumberDto,
  ): Promise<LoginSuccessfulResponseType> {
    return this.service.confirmPhoneNumber(confirmPhoneNumberDto);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<Customer>> {
    return this.service.me(request.user);
  }
}
