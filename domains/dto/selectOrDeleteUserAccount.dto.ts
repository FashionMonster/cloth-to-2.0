import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//ユーザーアカウント検索または削除DTO
export class SelectOrDeleteUserAccountDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;
}
