import { ContributionInfosDto } from 'domains/dto/contributionInfosDto';
import { ContributionInfosEntity } from 'domains/entities/contributionInfosEntity';

// 取得した投稿情報EntityをDTOに変換
const convertContributionInfosEntityToDto = (
  entities: ContributionInfosEntity
): ContributionInfosDto => {
  let contributionInfosDto: ContributionInfosDto = [];

  for (const entity of entities) {
    const dto = {
      contributionId: entity.contributionId,
      materialName: entity.materialName,
      imageUrl1: entity.relationContributionImage!.imageUrl1,
    };

    contributionInfosDto.push(dto);
  }

  return contributionInfosDto;
};

export { convertContributionInfosEntityToDto };
