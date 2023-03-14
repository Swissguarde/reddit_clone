import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import Head from "next/head";
import { useRouter } from "next/router";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postAtom";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "@/hooks/useSelectFile";

type NewPostFormProps = {
  user: User;
};

const formTabs: Array<TabItem> = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images & Videos", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];
export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { communityId } = router.query;

  const handleCreatePost = async () => {
    // create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    // store post in db
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // check for selectedFile
      // store in storage => getDownloadURL (return URL)
      // update post doc by adding imageURL
      if (selectedFile) {
        const imageRef = ref(storage, `/posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error: any) {
      console.log("handleCreatePostError", error.message);
      setError(true);
    }
    setLoading(false);

    // redirect user to communityPage
  };

  // const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();
  //   if (e.target.files?.[0]) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  //   reader.onload = (readerEvent) => {
  //     if (readerEvent.target?.result) {
  //       setSelectedFile(readerEvent.target.result as string);
  //     }
  //   };
  // };

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value, name },
    } = e;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <Head>
        <title>Create Post - r/{communityId}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" bg="white" borderRadius={4} mt={2}>
        <Flex width="100%">
          {formTabs.map((item) => (
            <TabItem
              key={item.title}
              item={item}
              selected={item.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Flex>
        <Flex p={4}>
          {selectedTab === "Post" && (
            <TextInputs
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={handleCreatePost}
              loading={loading}
            />
          )}

          {selectedTab === "Images & Videos" && (
            <ImageUpload
              selectedFile={selectedFile}
              onSelectImage={onSelectFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setSelectedTab}
            />
          )}
        </Flex>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>Error creating post</Text>
          </Alert>
        )}
      </Flex>
    </>
  );
};
export default NewPostForm;
