import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { 
        toValue: 1, 
        duration: 1200, 
        useNativeDriver: true 
      }),
      Animated.spring(scaleAnim, { 
        toValue: 1, 
        tension: 40, 
        friction: 7, 
        useNativeDriver: true 
      }),
      Animated.timing(slideAnim, { 
        toValue: 0, 
        duration: 1000, 
        useNativeDriver: true 
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient 
        colors={[COLORS.primaryLight, COLORS.primary, '#020617']} 
        style={styles.gradient}
      >
        {/* Dynamic Background Elements */}
        <View style={styles.orb1} />
        <View style={styles.orb2} />

        <Animated.View style={[
          styles.content, 
          { 
            opacity: fadeAnim, 
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ] 
          }
        ]}>
          {/* Brand Logo Shield */}
          <View style={styles.logoOuter}>
            <LinearGradient
              colors={[COLORS.secondary, '#B45309']}
              style={styles.logoInner}
            >
              <Text style={styles.shieldIcon}>🛡️</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifyCheck}>✓</Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.appName}>Sumbandila</Text>
          <View style={styles.accentBar} />
          <Text style={styles.tagline}>PREMIUM VERIFICATION ENGINE</Text>
          <Text style={styles.location}>Republic of South Africa 🇿🇦</Text>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Secure • Transparent • Verified</Text>
            <View style={styles.loadingContainer}>
              <View style={styles.loadingTrack}>
                <Animated.View style={[styles.loadingBar, {
                  width: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }]} />
              </View>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  orb1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  orb2: {
    position: 'absolute',
    bottom: -80,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  content: { alignItems: 'center', width: '100%', paddingHorizontal: SPACING.xl },
  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 3,
    marginBottom: 24,
    ...SHADOW.large,
  },
  logoInner: {
    flex: 1,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldIcon: { fontSize: 60 },
  verifiedBadge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  verifyCheck: { color: '#fff', fontWeight: '900', fontSize: 18 },
  appName: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  accentBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
    marginVertical: 12,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 4,
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
    fontWeight: '600',
  },
  footerContainer: {
    marginTop: 60,
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 20,
  },
  loadingContainer: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingTrack: { flex: 1 },
  loadingBar: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
});
