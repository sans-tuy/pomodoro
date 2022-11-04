import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Img,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';
import ItemTodo from '../../component/molecules/itemTodo';
import ItemAddTodo from '../../component/molecules/itemAddTodo';

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => console.warn('onExpire called'),
      autoStart: false,
    });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span> : <span>{seconds}</span>
      </div>
      <Button
        onClick={start}
        bgColor={'#0080C8'}
        color={'white'}
        width={'full'}
      >
        Start
      </Button>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 25 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 1500);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  );
}

function Main() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);
  const [tasks, setTasks] = useState([]);
  const addTask = task => {
    if (task == null) return;
    setTasks([...tasks, task]);
  };

  const deleteTask = deleteIndex => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  };

  return (
    <Box mb={'30px'}>
      <Center mt={'70px'}>
        <Img
          width={'140px'}
          src={require('../../assets/images/undraw_season_change_f99v 1.png')}
        />
      </Center>
      <VStack>
        <Box
          bgColor={'white'}
          p={3}
          borderRadius={8}
          minW={'40%'}
          maxW={'760px'}
          mt={'20px'}
        >
          <MyTimer expiryTimestamp={time} />

          <Text textAlign={'center'} fontSize="20px" color={'gray.400'} mt={4}>
            The time that has been spent is 0 hours 0 minutes{' '}
          </Text>
        </Box>
        {tasks.map((val, index) => (
          <ItemTodo text={val} deleteTask={() => deleteTask(index)} />
        ))}
        <ItemAddTodo addTask={addTask} />
      </VStack>
    </Box>
  );
}

export default Main;
