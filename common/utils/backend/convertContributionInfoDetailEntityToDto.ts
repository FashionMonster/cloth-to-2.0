import { ContributionInfoDetailDto } from 'domains/dto/contributionInfoDetailDto';
import { ContributionImageEntity } from 'domains/entities/contributionImageEntity';
import { ContributionInfoDetailEntity } from 'domains/entities/contributionInfoDetailEntity';
import { isExistValue } from 'common/utils/isExistValue';

// 取得した投稿情報詳細EntityをDTOに変換
const convertContributionInfoDetailEntityToDto = (
  entity: ContributionInfoDetailEntity
): ContributionInfoDetailDto => {
  let contributionInfoDetailDto: ContributionInfoDetailDto = {
    contributionId: entity.contributionId,
    materialName: entity.materialName,
    category: entity.category,
    composition1: entity.composition1,
    compositionRatio1: entity.compositionRatio1,
    composition2: entity.composition2,
    compositionRatio2: entity.compositionRatio2,
    composition3: entity.composition3,
    compositionRatio3: entity.compositionRatio3,
    fabricStructure: entity.fabricStructure,
    color: entity.color,
    pattern: entity.pattern,
    processing: entity.processing,
    unitPrice: entity.unitPrice,
    supplier: entity.supplier,
    comment: entity.comment,
    imageName: [],
  };

  //投稿画像テーブルのバリューを取得
  for (let prop in entity.relationContributionImage) {
    const imageEntityValue =
      entity.relationContributionImage[prop as keyof ContributionImageEntity];

    //値が存在する場合のみ、DTOにセット
    if (isExistValue(imageEntityValue)) {
      contributionInfoDetailDto.imageName.push(imageEntityValue as string);
    }
  }

  return contributionInfoDetailDto;
};

export { convertContributionInfoDetailEntityToDto };
