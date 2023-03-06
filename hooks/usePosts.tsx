import { postState } from "@/atoms/postAtom";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  console.log(postStateValue);

  const onVote = async () => {};
  const onSelectPost = () => {};

  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
};
export default usePosts;
