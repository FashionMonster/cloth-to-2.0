import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//ユーザーアカウント登録リクエストDTO
export class SignupReqDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  userName!: string;
}
