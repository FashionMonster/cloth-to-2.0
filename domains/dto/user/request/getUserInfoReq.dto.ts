import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//ユーザー情報取得リクエストDTO
export class GetUserInfoReqDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;
}
