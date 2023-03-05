import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type TabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  const { icon, title } = item;
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      fontWeight={700}
      p="14px 0px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={icon} />
        <Text>{title}</Text>
      </Flex>
    </Flex>
  );
};
export default TabItem;
