import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#0A2463', '#1565C0', '#1A237E']} style={styles.container}>
      {/* Background circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      {/* SA Flag stripe */}
      <View style={styles.flagStripe}>
        <View style={[styles.stripeBar, { backgroundColor: '#007A4D' }]} />
        <View style={[styles.stripeBar, { backgroundColor: '#FFFFFF' }]} />
        <View style={[styles.stripeBar, { backgroundColor: '#001489' }]} />
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Shield Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.shield}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        </View>

        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.appName}>Sumbandila</Text>
          <Text style={styles.tagline}>VERIFICATION & FUNDING HUB</Text>
          <Text style={styles.country}>South Africa</Text>
        </Animated.View>

        <Animated.Text style={[styles.motto, { opacity: fadeAnim }]}>
          Verified. Connected. Supported.
        </Animated.Text>
      </Animated.View>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle1: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.04)', top: -60, right: -80,
  },
  circle2: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.04)', bottom: 80, left: -60,
  },
  flagStripe: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
    flexDirection: 'column',
  },
  stripeBar: { flex: 1 },
  content: { alignItems: 'center', paddingHorizontal: SPACING.xl },
  logoContainer: { marginBottom: SPACING.lg },
  shield: {
    width: 100, height: 100, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.xl,
    borderWidth: 2, borderColor: 'rgba(244,200,66,0.5)',
  },
  shieldIcon: { fontSize: 52 },
  checkmark: {
    position: 'absolute', bottom: -4, right: -4,
    backgroundColor: COLORS.success, width: 28, height: 28,
    borderRadius: 14, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  checkmarkText: { color: '#fff', fontWeight: '900', fontSize: 14 },
  appName: {
    fontSize: 42, fontWeight: '800', color: '#FFFFFF',
    textAlign: 'center', letterSpacing: 1,
  },
  tagline: {
    fontSize: 12, fontWeight: '700', color: COLORS.secondary,
    textAlign: 'center', letterSpacing: 3, marginTop: 4,
  },
  country: {
    fontSize: 13, color: 'rgba(255,255,255,0.6)',
    textAlign: 'center', marginTop: 4,
  },
  motto: {
    fontSize: 15, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', marginTop: SPACING.xl, fontStyle: 'italic',
  },
  bottom: {
    position: 'absolute', bottom: 50, alignItems: 'center',
  },
  dots: { flexDirection: 'row', gap: 8 },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: { backgroundColor: COLORS.secondary, width: 24, borderRadius: 4 },
});
