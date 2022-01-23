import { IsString, IsEmail } from 'class-validator';

//グループ紐付けリクエストDTO
export class LinkUserToGroupReqDto {
  @IsString()
  @IsEmail()
  userId!: string;

  @IsString()
  @IsEmail()
  groupId!: string;

  @IsString()
  groupPass!: string;
}
