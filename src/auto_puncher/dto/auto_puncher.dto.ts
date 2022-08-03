import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class SignForSheetDto {
  @ApiProperty()
  @IsNotEmpty()
  credential: JSON;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sheetKey: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  onWorkTime: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  offWorkTime: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workHours: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  crontabString: string;
  @ApiProperty()
  @IsNotEmpty()
  tokenData: JSON;
}
