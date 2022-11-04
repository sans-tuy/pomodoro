import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
function ItemTodo(props) {
  const handleDelete = val => {
    props.deleteTask(val);
  };
  return (
    <>
      <Flex
        justifyContent={'space-between'}
        bgColor={'white'}
        p={3}
        borderRadius={8}
        minW={'40%'}
        maxW={'760px'}
        mt={'20px'}
      >
        <Text textAlign={'center'} fontSize="20px" color={'black'}>
          {props.text}
        </Text>
        <Button onClick={() => handleDelete(props.index)}>delete</Button>
      </Flex>
    </>
  );
}
export default ItemTodo;
