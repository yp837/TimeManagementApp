import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { Text, View, StyleSheet, Dimensions, TextInput, Button } from 'react-native';
import appConfig from '../app.json';  // Go up one directory to access app.json
import Timer from './Timer';  // Import Timer component
import { Calendar } from 'react-native-calendars';  // Import the Calendar

const appName = appConfig.expo.name;  // Access the name property from the JSON object

const { height, width } = Dimensions.get('window'); // Use screen dimensions

// Define the types for tasks and selectedDate
interface Task {
  task: string;
  date: string;
}

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);  // Selected date to be used for tasks
  const [tasks, setTasks] = useState<Task[]>([]);  // Array of tasks
  const [newTask, setNewTask] = useState<string>('');  // Input for the new task

  // Handle date change when a user presses a day on the calendar
  const handleDateChange = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);  // Store the selected date
  };

  // Add the task and associate it with the selected date
  const handleAddTask = (task: string) => {
    if (task && selectedDate) {
      // Add the new task with the selected date
      setTasks([...tasks, { task, date: selectedDate }]);
      setNewTask('');  // Clear the input after adding the task
    }
  };

  // Function to get tasks for the selected date
  const getTasksForSelectedDate = (date: string) => {
    return tasks.filter((task) => task.date === date);  // Filter tasks for the selected date
  };

  // Mark dates on the calendar with tasks
  const getMarkedDates = () => {
    const markedDates: { [key: string]: any } = {};
    tasks.forEach((task) => {
      markedDates[task.date] = { marked: true, dotColor: 'blue' };  // Mark dates with a blue dot if a task exists
    });
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.deviceFrame}>
        <View style={styles.deviceScreen}>
          <Text style={styles.title}>Time Management App</Text>

          {/* Calendar Component */}
          <Calendar
            onDayPress={(day: { dateString: string }) => handleDateChange(day)}  // Correctly typed 'day'
            markedDates={{
              ...getMarkedDates(),
              [selectedDate ?? '']: { selected: true, selectedColor: 'blue' },  // Highlight selected date with blue
            }}
            theme={{
              selectedDayBackgroundColor: 'blue',  // Highlight selected day with blue
              todayTextColor: 'red',  // Make today's date text red
            }}
          />

          {/* Task Input and Button */}
          {selectedDate && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.taskInput}
                placeholder="Enter task"
                value={newTask}
                onChangeText={(text) => setNewTask(text)}  // Update task input
              />
              <Button title="Add Task" onPress={() => handleAddTask(newTask)} />  {/* Add the task when clicked */}
            </View>
          )}

          {/* Display tasks for the selected date */}
          {selectedDate && (
            <View style={styles.taskContainer}>
              <Text style={styles.subtitle}>Tasks for {selectedDate}:</Text>
              <View>
                {getTasksForSelectedDate(selectedDate).map((task, index) => (
                  <View key={index} style={styles.taskItem}>
                    <Text style={styles.taskText}>{task.task} - {task.date}</Text>  {/* Display task and date */}
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {/* Timer */}
          <Timer />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  deviceFrame: {
    width: 375, // Fixed width for mobile screen size (adjust as needed)
    height: 667, // Fixed height for mobile screen size (adjust as needed)
    backgroundColor: 'gray',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  deviceScreen: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  taskInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  taskContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
});

AppRegistry.registerComponent(appName, () => App);

export default App;
