import { atom } from "recoil";

type Props= {
  id:number
}

export const DeletedStory = atom<Props>({
  key: 'deletestory',
  default:{
    id: -1
  },
});
