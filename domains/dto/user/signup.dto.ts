import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

//ユーザーアカウント登録DTO
export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  userName!: string;

  @IsOptional()
  @IsString()
  groupId?: string;
}
