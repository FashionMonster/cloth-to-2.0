import { IsString, IsEmail } from 'class-validator';

//グループ紐付けDTO
export class LinkUserToGroupDTO {
  @IsString()
  @IsEmail()
  userId!: string;

  @IsString()
  @IsEmail()
  groupId!: string;

  @IsString()
  groupPass!: string;
}
