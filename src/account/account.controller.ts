import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/createAccount.dto';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  public get(@Param('id') accountId: string) {
    return this.accountService.get(accountId);
  }

  @Get()
  public getAll() {
    return this.accountService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Put('/topup/:id')
  public update(
    @Param('id') accountId: string,
    @Body('amount') amount: number,
  ) {
    return this.accountService.update(accountId, amount);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') accountId: string) {
    return this.accountService.delete(accountId);
  }
}
