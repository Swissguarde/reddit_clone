import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        placeholder="Title"
        fontSize="10pt"
        borderRadius={4}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      />
      <Textarea
        value={textInputs.body}
        onChange={onChange}
        name="body"
        height="100px"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      />
      <Flex justify="flex-end">
        <Button
          isLoading={loading}
          height="34px"
          p="0px 30px"
          disabled={!textInputs.title}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
