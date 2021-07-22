import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const findData = tasks.find(task =>  task.title === data.title)
    
    if(!!findData) {
      Alert.alert('Tarefa já existente 😄')
    } else {
      setTasks([...tasks, data]);
    }

  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => {
      if(task.id === id) {
        return {...task, done: true}
      }
      return task
    } ))
  }

  function handleRemoveTask(id: number) {
    const createTwoButtonAlert = () =>
    Alert.alert(
      'Remove tarefa',
      'Deseja realmente remover essa tarefas?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        { text: 'OK', onPress: () => {
          setTasks(tasks.filter(task => task.id !== id))
        } }
      ]
    );

    createTwoButtonAlert()
  }

  function handleEditTask(id: number) {
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})