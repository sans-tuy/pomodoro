import { Box, Input } from '@chakra-ui/react';
import { useState } from 'react';

const ItemAddTodo = props => {
  const [task, setTask] = useState('');

  const handleAddTask = value => {
    props.addTask(value);
    setTask(null);
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
        placeholder={props.placeholder}
        placeholderTextColor={'#6e767d'}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleAddTask(task);
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

export default ItemAddTodo;
