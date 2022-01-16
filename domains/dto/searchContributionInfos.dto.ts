import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

//投稿情報検索DTO
export class SearchContributionInfosDTO {
  @IsNumber()
  page!: number;

  @IsString()
  searchCategory!: string;

  @IsString()
  keyword!: string;

  @IsString()
  @IsOptional()
  compositionRatio?: string;

  @IsString()
  @IsOptional()
  compareCondition?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsEmail()
  groupId!: string;
}
