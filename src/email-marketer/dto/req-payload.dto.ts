import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';

export class SettingsDto {
  @IsString()
  default: string;

  @IsString()
  label: string;

  @IsBoolean()
  required: boolean;

  @IsString()
  type: string;
}

export class ReqPayloadDto {
  @IsString()
  message: string;

  @IsString()
  channel_id: string;

  @IsString()
  thread_id: string;

  @IsString()
  org_id: string;

  @ValidateNested({ each: true })
  @Type(() => SettingsDto)
  settings: SettingsDto[];
}
