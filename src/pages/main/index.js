import React, { useLayoutEffect, useState } from 'react';
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

function MyTimer({ expiryTimestamp, autoStart, setExpired }) {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => setExpired(e => !e),
      autoStart: autoStart,
    });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span> : <span>{seconds}</span>
      </div>
      {!autoStart && (
        <Button
          onClick={start}
          bgColor={'#0080C8'}
          color={'white'}
          width={'full'}
        >
          Start
        </Button>
      )}
      {/* <Button
        onClick={() => setExpired(e => !e)}
        bgColor={'#0080C8'}
        color={'white'}
        width={'full'}
      >
        Start
      </Button> */}
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
  const [expired, setExpired] = useState(false);
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
  };

  const deleteTask = deleteIndex => {
    setTasks(tasks.filter((value, index) => index !== deleteIndex));
  };

  const handleAdd = () => {
    setAdd(true);
  };
  const [tabIndex, setTabIndex] = useState(0);

  useLayoutEffect(() => {
    expired === true ? setTabIndex(1) : setTabIndex(0);
    tabIndex === 1
      ? (document.body.style.backgroundColor = '#008F53')
      : (document.body.style.backgroundColor = '#0080c8');
  }, [tabIndex, expired]);

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
          <Tabs index={tabIndex} onChange={index => setTabIndex(index)} isLazy>
            <TabList>
              <Tab isDisabled={expired} minW={'50%'}>
                Pomodoro
              </Tab>
              <Tab isDisabled={!expired} minW={'50%'}>
                Break Time
              </Tab>
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
                  <MyTimer
                    expiryTimestamp={time}
                    setExpired={setExpired}
                    autoStart={false}
                  />
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
                <MyTimer
                  expiryTimestamp={timeBreak}
                  setExpired={setExpired}
                  autoStart={true}
                />
                <Box mt={4} />
                <iframe
                  src="https://itch.io/embed-upload/6971421?color=000000"
                  allowfullscreen=""
                  width="100%"
                  height="340"
                  frameborder="0"
                >
                  <a href="https://aldolim66.itch.io/survive-in-space">
                    Play Survive In Space on itch.io
                  </a>
                </iframe>
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
        {tabIndex === 0 && (
          <Box>
            {add ? <ItemAddTodo addTask={addTask} /> : null}
            {edit ? (
              <ItemEditTodo
                task={dataEdit}
                editTask={completedEdit}
                setEdit={setEdit}
              />
            ) : null}
          </Box>
        )}
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
