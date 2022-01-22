import { IsString, IsEmail, IsOptional } from 'class-validator';

//ユーザーアカウント更新DTO
export class UpdateUserInfoDTO {
  @IsOptional()
  @IsString()
  @IsEmail()
  userId?: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  previousUserId?: string;
}
