import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

//グループ紐付けリクエストDTO
export class LinkUserToGroupReqDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  groupId!: string;

  @IsNotEmpty()
  @IsString()
  groupPass!: string;
}
