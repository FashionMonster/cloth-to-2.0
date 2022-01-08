import { IsString, IsEmail, IsOptional } from 'class-validator';

//ユーザーアカウント更新DTO
export class UpdateUserAccountDTO {
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
}
