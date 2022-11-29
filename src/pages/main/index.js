import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Img,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';
import ItemTodo from '../../component/molecules/itemTodo';
import ItemAddTodo from '../../component/molecules/itemAddTodo';
import ItemEditTodo from '../../component/molecules/itemEditTodo';
import { MdAddCircleOutline } from 'react-icons/md';

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
  const timeBreak = new Date();
  timeBreak.setSeconds(time.getSeconds() + 300);
  // const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      title: 'first',
      completed: false,
    },
  ]);
  const addTask = task => {
    if (task == null) return;
    setTasks([...tasks, { id: Math.random(), title: task, completed: false }]);
    setAdd(false);
  };

  const completedTask = completedTask => {
    const task = [...tasks];
    task.map(data => {
      if (data.id === completedTask.id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTasks([...task]);
  };

  const editTask = editedTask => {
    setDataEdit(editedTask);
  };

  const completedEdit = (index, title) => {
    const task = [...tasks];
    task.map(data => {
      if (data.id === index) {
        data.title = title;
      }
      return data;
    });
    setTasks([...task]);
    // console.log('index: ', index);
    // console.log('title: ', title);
  };

  const deleteTask = deleteIndex => {
    setTasks(tasks.filter((value, index) => index !== deleteIndex));
  };

  const handleAdd = () => {
    setAdd(true);
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
          <Tabs>
            <TabList>
              <Tab minW={'50%'}>Pomodoro</Tab>
              <Tab minW={'50%'}>Break Time</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box
                  bgColor={'white'}
                  p={3}
                  borderRadius={8}
                  minW={'40%'}
                  maxW={'760px'}
                  mt={'20px'}
                >
                  <MyTimer expiryTimestamp={time} />
                  <Text
                    textAlign={'center'}
                    fontSize="20px"
                    color={'gray.400'}
                    mt={4}
                  >
                    The time that has been spent is 0 hours 0 minutes{' '}
                  </Text>
                </Box>
                {tasks.map((val, index) => (
                  <ItemTodo
                    key={index}
                    task={val}
                    index={index}
                    setEdit={setEdit}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    completeTask={completedTask}
                  />
                ))}
              </TabPanel>
              <TabPanel>
                <MyTimer expiryTimestamp={timeBreak} />
                <Text
                  textAlign={'center'}
                  fontSize="20px"
                  color={'gray.400'}
                  mt={4}
                >
                  The time that has been spent is 0 hours 0 minutes{' '}
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <hr style={{ width: '40%', marginTop: 15, marginBottom: 10 }} />
        {add ? <ItemAddTodo addTask={addTask} /> : null}
        {edit ? (
          <ItemEditTodo
            task={dataEdit}
            editTask={completedEdit}
            setEdit={setEdit}
          />
        ) : null}
      </VStack>
      <Flex justifyContent={'end'} me={'3%'}>
        <Button
          variant={'ghost'}
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          onClick={() => handleAdd()}
        >
          <MdAddCircleOutline color={'white'} size={'3.5rem'} />
        </Button>
      </Flex>
    </Box>
  );
}

export default Main;
