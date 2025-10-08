import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function EmotionHeading() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial opacity

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}>
        Explore Your Emotion 😃
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});
