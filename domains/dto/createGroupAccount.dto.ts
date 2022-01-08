import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//グループアカウント登録DTO
export class CreateGroupAccountDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  groupId!: string;

  @IsNotEmpty()
  @IsString()
  groupName!: string;

  @IsNotEmpty()
  @IsString()
  groupPass!: string;
}
