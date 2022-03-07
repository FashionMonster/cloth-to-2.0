import {
  IsString,
  IsOptional,
  IsArray,
  IsNumberString,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';

//投稿情報更新リクエストDTO
export class UpdateContributionReqDto {
  @IsNotEmpty()
  @IsNumberString()
  contributionId!: string;

  @IsNotEmpty()
  @IsString()
  groupId!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  materialName!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsString()
  @IsOptional()
  composition1?: string;

  @IsNumberString()
  @IsOptional()
  compositionRatio1?: string;

  @IsString()
  @IsOptional()
  composition2?: string;

  @IsNumberString()
  @IsOptional()
  compositionRatio2?: string;

  @IsString()
  @IsOptional()
  composition3?: string;

  @IsNumberString()
  @IsOptional()
  compositionRatio3?: string;

  @IsString()
  @IsOptional()
  fabricStructure?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  pattern?: string;

  @IsString()
  @IsOptional()
  processing?: string;

  @IsNumberString()
  @IsOptional()
  unitPrice?: string;

  @IsString()
  @IsOptional()
  supplier?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  imageName!: string[];
}
