import { IsString, IsEmail, IsOptional, IsNumberString } from 'class-validator';

//投稿情報検索リクエストDTO
export class SearchReqDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  searchCategory?: string;

  @IsString()
  @IsOptional()
  keyword?: string;

  @IsNumberString()
  @IsOptional()
  compositionRatio?: string;

  @IsNumberString()
  @IsOptional()
  compareCondition?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  groupId?: string;
}
