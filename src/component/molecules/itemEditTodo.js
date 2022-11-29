import { Box, Input } from '@chakra-ui/react';
import { useState } from 'react';

const ItemEditTodo = props => {
  const [task, setTask] = useState(props.task.title);

  const handleEditTask = (index, value) => {
    props.editTask(index, value);
    setTask(null);
    props.setEdit(false);
  };
  return (
    <Box
      bgColor={'white'}
      p={3}
      borderRadius={8}
      minW={'40%'}
      maxW={'760px'}
      mt={'20px'}
    >
      <Input
        value={task}
        onChange={e => setTask(e.currentTarget.value)}
        // placeholderTextColor={'#6e767d'}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleEditTask(props.task.id, task);
          }
        }}
      />
      {/* <TouchableOpacity onPress={() => }>
        <View style={styles.button}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        </View>
      </TouchableOpacity> */}
    </Box>
  );
};

export default ItemEditTodo;
