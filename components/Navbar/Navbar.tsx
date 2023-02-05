import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
      >
        <Image src="/images/redditFace.svg" height="30px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
        />
      </Flex>
      {/* <Directory/> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
