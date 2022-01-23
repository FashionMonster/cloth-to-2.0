import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//ユーザーアカウント登録取消し(削除)リクエストDTO
export class CancelSignupReqDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;
}
