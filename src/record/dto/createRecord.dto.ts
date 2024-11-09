import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  spentAmount: number;
}
