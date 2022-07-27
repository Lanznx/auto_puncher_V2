import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class SignForSheetDto {
  @IsNotEmpty()
  credential: JSON;
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
  @IsNotEmpty()
  tokenData: JSON;
}
