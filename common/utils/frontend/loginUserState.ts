import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const loginUserState = atom({
  key: 'loginUserInfo',
  default: {
    userId: '',
    userName: '',
    groupId: '',
  },
  effects_UNSTABLE: [persistAtom], //データの永続化
});

export { loginUserState };
