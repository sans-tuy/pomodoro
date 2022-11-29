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
import { FaTrash } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
function ItemTodo(props) {
  const handleDelete = index => {
    props.deleteTask(index);
  };
  const handleEdit = task => {
    props.editTask(task);
    props.setEdit(true);
  };
  const handleComplete = task => {
    props.completeTask(task);
  };
  const renderTask = () => {
    if (props.task.completed) return <s>{props.task.title}</s>;
    else return props.task.title;
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
        <Text
          textAlign={'center'}
          fontSize="20px"
          color={'black'}
          onClick={() => handleComplete(props.task)}
        >
          {renderTask()}
        </Text>
        <Flex justifyContent={'end'}>
          {props.task.completed ? null : (
            <Button variant="ghost" onClick={() => handleEdit(props.task)}>
              <RiEdit2Fill color={'#C8B400'} size={'1.2rem'} />
            </Button>
          )}
          <Button variant="ghost" onClick={() => handleDelete(props.index)}>
            <FaTrash color={'#C80000'} />
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
export default ItemTodo;
