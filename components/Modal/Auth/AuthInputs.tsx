import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);
  const { view } = modalState;
  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {view === "login" && <LogIn />}
      {view === "signup" && <SignUp />}
    </Flex>
  );
};
export default AuthInputs;
