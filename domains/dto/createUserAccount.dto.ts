import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

//ユーザーアカウント登録DTO
export class CreateUserAccountDTO {
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
