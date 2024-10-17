import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

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
