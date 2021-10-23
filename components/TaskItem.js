import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


const TaskItem = (props) => {
    console.log("hola, ", props)
  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{props.index}</Text>
      </View>
      <View style={styles.taskContainer}>
        <Text style={(props.task.status) ? styles.taskDone : styles.task}>{props.task.name}</Text>
        <TouchableOpacity onPress={() => props.deleteTask()}>
          <MaterialIcons
            style={styles.delete}
            name="delete"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.markTaskDone(props.task.id)}>
          <MaterialIcons
            style={styles.done}
            name="done"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  indexContainer: {
    backgroundColor: '#CEAA9A',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  index: {
    color: '#fff',
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: '#CEAA9A',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: '#fff',
    width: '90%',
    fontSize: 16,

  },
  taskDone: {
    color: '#fff',
    width: '90%',
    fontSize: 16,
    textDecorationLine: "line-through",

  },
  delete: {
    marginLeft: 0,
  },
  done: {
    marginLeft: 0,
  },
})