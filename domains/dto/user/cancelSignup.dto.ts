import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//ユーザーアカウント登録取消し(削除)DTO
export class CancelSignupDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;
}
