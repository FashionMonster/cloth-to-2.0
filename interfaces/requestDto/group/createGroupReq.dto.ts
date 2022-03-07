import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

//グループアカウント登録リクエストDTO
export class CreateGroupReqDto {
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
