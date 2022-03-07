import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

//ユーザーアカウント更新リクエストDTO
export class UpdateUserInfoReqDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  userName!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  previousUserId!: string;
}
