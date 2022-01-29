import axios, { AxiosResponse } from 'axios';
import { downloadImage } from 'common/utils/frontend/downloadImage';
import type { ContributionInfoDetail } from 'constants/types/contributionInfoDetail';

//投稿データ詳細を取得する
const fetchContributionDetail = async () => {
  //パスに含まれる投稿IDを取得
  const urlParamNum = window.location.href.lastIndexOf('/') + 1;
  const contributionId = window.location.href.substr(urlParamNum);

  const res: AxiosResponse<{ contributionInfoDetail: ContributionInfoDetail }> = await axios
    .get('../api/contribution/getContributionDetail', {
      params: {
        contributionId: contributionId,
      },
    })
    .then((res) => {
      //初期化
      res.data.contributionInfoDetail.imageUrl = [];
      return res;
    })
    .catch((error) => {
      throw error;
    });

  for (let imageName of res.data.contributionInfoDetail.imageName) {
    //downloadUrlを取得
    const src = await downloadImage(imageName);

    //downloadURLの配列を生成
    res.data.contributionInfoDetail.imageUrl.push(src);
  }

  return res.data.contributionInfoDetail;
};

export { fetchContributionDetail };
