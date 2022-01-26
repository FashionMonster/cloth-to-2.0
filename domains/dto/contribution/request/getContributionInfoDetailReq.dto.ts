import { IsNumberString } from 'class-validator';

//投稿情報詳細取得リクエストDTO
export class getContributionInfoDetailReqDto {
  @IsNumberString()
  contributionId!: string;
}
