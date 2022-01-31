import { ContributionInfoDto } from 'domains/dto/contribution/contributionInfoDto';
import { ContributionInfoEntity } from 'domains/entities/contributionInfoEntity';

// 取得した投稿情報EntityをDTOに変換
const convertContributionInfosEntityToDto = (
  entities: ContributionInfoEntity[]
): ContributionInfoDto[] => {
  let contributionInfosDto: ContributionInfoDto[] = [];

  for (const entity of entities) {
    const dto = {
      contributionId: entity.contributionId,
      materialName: entity.materialName,
      imageName1: entity.relationContributionImage!.imageName1,
    };

    contributionInfosDto.push(dto);
  }

  return contributionInfosDto;
};

export { convertContributionInfosEntityToDto };
