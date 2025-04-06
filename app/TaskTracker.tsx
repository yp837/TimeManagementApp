import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define the Task type
interface Task {
  task: string;
  date: string;
}

// Define props type for TaskTracker component
interface TaskTrackerProps {
  tasks: Task[];  // Receive tasks as a prop
}

const TaskTracker: React.FC<TaskTrackerProps> = ({ tasks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Tracker</Text>

      {/* List tasks with their associated date */}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item.task}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    marginBottom: 10,
  },
  task: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  date: {
    padding: 10,
    fontSize: 14,
    color: '#888',
  },
});

export default TaskTracker;
