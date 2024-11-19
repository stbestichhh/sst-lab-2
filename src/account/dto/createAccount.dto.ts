import { AccountCreationAttributes } from '../../database/models';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateAccountDto implements AccountCreationAttributes {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  money: number;
}
