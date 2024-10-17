import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsObject()
  @IsNotEmpty()
  data: {
    name: string;
  };
}
