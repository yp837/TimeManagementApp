// Timer.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Track the interval ID

  useEffect(() => {
    // If the timer is running, set the interval
    if (isRunning) {
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      setIntervalId(interval); // Save the interval ID
    } else {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval when stopping the timer
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Cleanup on component unmount
      }
    };
  }, [isRunning, intervalId]); // Use `intervalId` as dependency

  const handleStartStop = () => {
    setIsRunning(prev => !prev); // Toggle the timer state
  };

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId); // Clear the interval when resetting
    }
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      <Text style={styles.timer}>{seconds}s</Text>
      <Button title={isRunning ? "Stop Timer" : "Start Timer"} onPress={handleStartStop} />
      <Button title="Reset Timer" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Timer;
