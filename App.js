import React, {useEffect, useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [tasks, setTasks] = useState([]);
  
  const [ appInit, setAppInit ] = useState( true )


  useEffect( () => {
    if( appInit ) {
      getData()
      setAppInit( false )
      console.log('getting data...')
    }
    else {
      storeData()
      console.log('storing data...')
    }
    // sortData()
  }, [tasks] )


  const addTask = (task) => {
    if (task == null) return;
    const id = new Date().getTime().toString()
    const item = { id: id, name: task, status: false }
    setTasks([...tasks, task]);
    console.log(tasks)
    console.log(task)
    //console.log(item)




    Keyboard.dismiss();

  }

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));

  }
  
  const storeData = async () => {
    const stringified = JSON.stringify( tasks )
    try {
      await AsyncStorage.setItem( "listData" , stringified ) 
    } catch (error) {
      console.log( error )
    }
  }

  const getData = async () => {
    try {
      const stringified = await AsyncStorage.getItem("listData")
      setTasks( (stringified !== null) ? JSON.parse(stringified) : [] )
    } catch (error) {
      console.log( error )
    }
  }


  return (
    <View style={styles.container}>
        <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        {
        tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(index)}/>
            </View>
          );
        })
      }
      </ScrollView>
      <TaskInputField addTask={addTask}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4ef',
  },
  heading: {
    color: '#CEAA9A',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});