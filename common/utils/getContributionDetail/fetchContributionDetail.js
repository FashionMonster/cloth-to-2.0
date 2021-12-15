import axios from "axios";
import { downloadImage } from "../downloadImage";
import { getUserInfo } from "../getUserInfo";

//データフェッチ
const fetchContributionDetail = async (router) => {
  //リクエストデータ
  let reqData;

  //useContext()のデータ取得はフェッチ後になるので、再取得
  const userInfo = await getUserInfo();

  //パスに含まれる投稿IDを取得
  const urlParamNum = window.location.href.lastIndexOf("/") + 1;
  const contributionId = window.location.href.substr(urlParamNum);

  reqData = {
    groupId: userInfo.groupId,
    contributionId: contributionId,
  };

  //編集画面のデータ取得で必要になる追加データ
  if (router.pathname === "/edit") {
    reqData.userId = userInfo.userId;
  }

  const { data } = await axios.get("../api/getContributionDetail", {
    params: reqData,
  });

  //downloadUrlを取得、dataにセットする
  var imgFileUrlArray = [];
  for (let res of data.imageUrl) {
    if (res !== null) {
      const src = await downloadImage(res);
      imgFileUrlArray.push(src);
    } else {
      imgFileUrlArray.push("");
    }
  }
  data.imgFileUrl = imgFileUrlArray;

  return data;
};

export { fetchContributionDetail };
