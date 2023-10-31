import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 250)
  description: string;
}
