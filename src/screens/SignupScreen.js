import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Animated, KeyboardAvoidingView, Platform, ScrollView, Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Incomplete Fields', 'Please fill in all fields to create your account.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password should be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      setLoading(false);
      Alert.alert(
        'Account Created', 
        'Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (err) {
      setLoading(false);
      Alert.alert('Signup Failed', err.message || 'Could not create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.primaryLight, COLORS.primary]} style={styles.background}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.flex}
        >
          <ScrollView 
            contentContainerStyle={styles.scroll} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              {/* Brand Area */}
              <View style={styles.brandArea}>
                <View style={styles.logoOuter}>
                  <LinearGradient
                    colors={[COLORS.secondary, '#D97706']}
                    style={styles.logoInner}
                  >
                    <Text style={styles.logoText}>🛡️</Text>
                  </LinearGradient>
                </View>
                <Text style={styles.brandTitle}>Sumbandila</Text>
                <Text style={styles.brandSub}>JOIN THE NATIONAL HUB</Text>
              </View>

              {/* Signup Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Create Account</Text>
                <Text style={styles.cardSubtitle}>Start your journey with verified trust</Text>

                <View style={styles.inputSection}>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      placeholderTextColor={COLORS.textMuted}
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>

                  <View style={styles.inputBox}>
                    <Text style={styles.inputIcon}>📧</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      placeholderTextColor={COLORS.textMuted}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputBox}>
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={COLORS.textMuted}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                      <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.btn, loading && styles.btnDisabled]}
                  onPress={handleSignup}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={[COLORS.accent, '#2563EB']}
                    style={styles.btnGrad}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.btnText}>{loading ? 'Creating...' : 'Register Now'}</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                   style={styles.footerLink} 
                   onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.footerLinkText}>Already have an account? <Text style={styles.linkBold}>Login</Text></Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.statusFooter}>POPIA Compliant • Secure 256-bit AES</Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: SPACING.lg },
  content: { alignItems: 'center', width: '100%' },
  brandArea: { alignItems: 'center', marginBottom: 40 },
  logoOuter: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 2,
    ...SHADOW.medium,
  },
  logoInner: {
    flex: 1,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { fontSize: 38 },
  brandTitle: { fontSize: 28, fontWeight: '900', color: '#fff', marginTop: 16, letterSpacing: -0.5 },
  brandSub: { fontSize: 10, fontWeight: '800', color: COLORS.secondary, letterSpacing: 2.5, marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.xl,
    padding: 30,
    width: '100%',
    ...SHADOW.large,
  },
  cardTitle: { fontSize: 24, fontWeight: '900', color: COLORS.text, marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: COLORS.textLight, marginBottom: 28 },
  inputSection: { gap: 16, marginBottom: 24 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: { fontSize: 18, marginRight: 12 },
  input: { flex: 1, height: '100%', color: COLORS.text, fontSize: 15, fontWeight: '500' },
  eyeBtn: { padding: 4 },
  eyeIcon: { fontSize: 18 },
  btn: { borderRadius: RADIUS.md, overflow: 'hidden', ...SHADOW.medium, marginTop: 10 },
  btnDisabled: { opacity: 0.7 },
  btnGrad: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  footerLink: { marginTop: 24, alignItems: 'center' },
  footerLinkText: { color: COLORS.textLight, fontSize: 14 },
  linkBold: { color: COLORS.primary, fontWeight: '700' },
  statusFooter: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '600', marginTop: 40 },
});
