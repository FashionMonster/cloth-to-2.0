import { IsNotEmpty, IsNumberString } from 'class-validator';

//投稿情報詳細取得リクエストDTO
export class getContributionInfoDetailReqDto {
  @IsNotEmpty()
  @IsNumberString()
  contributionId!: string;
}
