import { isExistValue } from 'common/utils/isExistValue';
import { ContributionSelectWhereInputDto } from 'domains/dto/contributionSelectWhereInputDto';

//検索条件生成
//https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
const createSearchContributionCondition = (
  param: ContributionSelectWhereInputDto
): { AND: {}[] } => {
  //検索条件の初期化
  let conditions: { AND: {}[] } = { AND: [] };

  //必須条件
  //論理削除されていない、ログインユーザーと同グループ
  conditions.AND.push({ isDeleted: false, groupId: param.groupId });

  //投稿履歴検索時、自身の投稿情報を取得する条件を追加
  if (isExistValue(param.userId)) {
    conditions.AND.push({ userId: param.userId });
  }

  //検索条件
  switch (param.searchCategory) {
    //１：素材・製品名
    case '1':
      conditions.AND.push({ materialName: { contains: param.keyword } });
      break;
    //２：分類
    case '2':
      conditions.AND.push({ category: param.keyword });
      break;
    //３：主組成
    case '3':
      switch (param.compareCondition) {
        //等しい
        case '1':
          conditions.AND.push({
            OR: [
              {
                composition1: param.keyword,
                compositionRatio1: param.compositionRatio,
              },
              {
                composition2: param.keyword,
                compositionRatio2: param.compositionRatio,
              },
              {
                composition3: param.keyword,
                compositionRatio3: param.compositionRatio,
              },
            ],
          });
          break;
        //以上
        case '2':
          conditions.AND.push({
            OR: [
              {
                composition1: param.keyword,
                compositionRatio1: { gte: param.compositionRatio },
              },
              {
                composition2: param.keyword,
                compositionRatio2: { gte: param.compositionRatio },
              },
              {
                composition3: param.keyword,
                compositionRatio3: { gte: param.compositionRatio },
              },
            ],
          });
          break;
        //以下
        case '3':
          conditions.AND.push({
            OR: [
              {
                composition1: param.keyword,
                compositionRatio1: { lte: param.compositionRatio },
              },
              {
                composition2: param.keyword,
                compositionRatio2: { lte: param.compositionRatio },
              },
              {
                composition3: param.keyword,
                compositionRatio3: { lte: param.compositionRatio },
              },
            ],
          });
          break;
        default:
      }
      break;
    //４：織・編地
    case '4':
      conditions.AND.push({ fabricStructure: { contains: param.keyword } });
      break;
    //５：色
    case '5':
      conditions.AND.push({ color: param.keyword });
      break;
    //６：柄
    case '6':
      conditions.AND.push({ pattern: { contains: param.keyword } });
      break;
    //７：加工
    case '7':
      conditions.AND.push({ processing: { contains: param.keyword } });
      break;
    //８：単価
    case '8':
      switch (param.compareCondition) {
        case '1':
          conditions.AND.push({ unitPrice: param.keyword });
          break;
        case '2':
          conditions.AND.push({ unitPrice: { gte: param.keyword } });
          break;
        case '3':
          conditions.AND.push({ unitPrice: { lte: param.keyword } });
          break;
        default:
      }
      break;
    //９：仕入先
    case '9':
      conditions.AND.push({ supplier: { contains: param.keyword } });
      break;
    //１０：投稿者
    case '10':
      conditions.AND.push({ relationUserId: { userName: { contains: param.keyword } } });
      break;
    default:
  }

  return conditions;
};

export { createSearchContributionCondition };
