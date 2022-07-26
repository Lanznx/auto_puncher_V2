import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignForSheetDto {
  @IsJSON()
  @IsNotEmpty()
  credentials: JSON;
  @IsString()
  @IsNotEmpty()
  sheetKey: string;
  @IsString()
  @IsNotEmpty()
  onWorkTime: string;
  @IsString()
  @IsNotEmpty()
  offWorkTime: string;
  @IsString()
  @IsNotEmpty()
  workHours: string;
  @IsString()
  @IsNotEmpty()
  crontabString: string;
}
