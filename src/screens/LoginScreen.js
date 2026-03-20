import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Animated, KeyboardAvoidingView, Platform, ScrollView, Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Incomplete Fields', 'Please enter your email and password to proceed.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      setLoading(false);
      navigation.replace('Main');
    } catch (err) {
      setLoading(false);
      Alert.alert('Login Failed', err.message || 'Invalid credentials. Please try again.');
    }
  };

  // 🧪 MOCK LOGIN — for web preview & testing only
  const handleMockLogin = () => {
    navigation.replace('Main');
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
              {/* Premium Brand Area */}
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
                <Text style={styles.brandSub}>NATIONAL VERIFICATION HUB</Text>
              </View>

              {/* Login Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Sign In</Text>
                <Text style={styles.cardSubtitle}>Access your verified dashboard</Text>

                <View style={styles.inputSection}>
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

                <TouchableOpacity style={styles.forgotPass}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, loading && styles.btnDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={[COLORS.accent, '#2563EB']}
                    style={styles.btnGrad}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.btnText}>{loading ? 'Verifying...' : 'Login'}</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.orRow}>
                  <View style={styles.line} />
                  <Text style={styles.orText}>New Here?</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity 
                   style={styles.outlineBtn} 
                   onPress={() => navigation.navigate('Signup')}
                >
                  <Text style={styles.outlineBtnText}>Create Account</Text>
                </TouchableOpacity>

                {/* 🧪 Test Drive Button - Dev/Preview Only */}
                <TouchableOpacity
                  style={styles.mockBtn}
                  onPress={handleMockLogin}
                >
                  <Text style={styles.mockBtnText}>🧪 Test Drive (No Login)</Text>
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
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 2,
    ...SHADOW.medium,
  },
  logoInner: {
    flex: 1,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { fontSize: 44 },
  brandTitle: { fontSize: 32, fontWeight: '900', color: '#fff', marginTop: 16, letterSpacing: -0.5 },
  brandSub: { fontSize: 11, fontWeight: '800', color: COLORS.secondary, letterSpacing: 2.5, marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.xl,
    padding: 30,
    width: '100%',
    ...SHADOW.large,
  },
  cardTitle: { fontSize: 26, fontWeight: '900', color: COLORS.text, marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: 28 },
  inputSection: { gap: 16 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: { fontSize: 18, marginRight: 12 },
  input: { flex: 1, height: '100%', color: COLORS.text, fontSize: 16, fontWeight: '500' },
  eyeBtn: { padding: 4 },
  eyeIcon: { fontSize: 18 },
  forgotPass: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 28 },
  forgotText: { color: COLORS.accent, fontSize: 14, fontWeight: '700' },
  btn: { borderRadius: RADIUS.md, overflow: 'hidden', ...SHADOW.medium },
  btnDisabled: { opacity: 0.7 },
  btnGrad: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.5 },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: COLORS.border },
  orText: { marginHorizontal: 15, color: COLORS.textMuted, fontSize: 13, fontWeight: '600' },
  outlineBtn: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outlineBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 16 },
  mockBtn: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderStyle: 'dashed',
  },
  mockBtnText: { color: '#D97706', fontWeight: '700', fontSize: 14 },
  statusFooter: { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: '600', marginTop: 40 },
});
