import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Animated, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 1200);
  };

  return (
    <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Logo */}
            <View style={styles.logoArea}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoIcon}>🛡️</Text>
              </View>
              <Text style={styles.brandName}>Sumbandila</Text>
              <Text style={styles.brandSub}>VERIFICATION & FUNDING HUB</Text>
              <Text style={styles.brandCountry}>South Africa</Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to your account</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.co.za"
                    placeholderTextColor={COLORS.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor={COLORS.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🔕'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#0A2463', '#1565C0']}
                  style={styles.loginGradient}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginText}>{loading ? 'Signing in…' : 'Login'}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.divLine} />
                <Text style={styles.divText}>or</Text>
                <View style={styles.divLine} />
              </View>

              <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.replace('Main')}>
                <Text style={styles.registerText}>Create New Account</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.tagline}>Verified. Connected. Supported.</Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: SPACING.lg },
  container: { alignItems: 'center' },
  logoArea: { alignItems: 'center', marginBottom: SPACING.xl },
  logoCircle: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 2, borderColor: 'rgba(244,200,66,0.5)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoIcon: { fontSize: 40 },
  brandName: { fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  brandSub: { fontSize: 10, fontWeight: '700', color: COLORS.secondary, letterSpacing: 2, marginTop: 2 },
  brandCountry: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  card: {
    backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.xl,
    width: '100%', ...SHADOW.large,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: SPACING.lg },
  inputGroup: { marginBottom: SPACING.md },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md, borderWidth: 1, borderColor: COLORS.border,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, height: 48, color: COLORS.text, fontSize: 15 },
  eyeIcon: { fontSize: 18, padding: 4 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: SPACING.md },
  forgotText: { color: COLORS.accent, fontSize: 13, fontWeight: '600' },
  loginBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginBottom: SPACING.md },
  loginBtnDisabled: { opacity: 0.7 },
  loginGradient: { paddingVertical: 14, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.sm },
  divLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  divText: { marginHorizontal: 12, color: COLORS.textMuted, fontSize: 13 },
  registerBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.md,
    paddingVertical: 13, alignItems: 'center',
  },
  registerText: { color: COLORS.primary, fontWeight: '700', fontSize: 15 },
  tagline: { color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontSize: 13, marginTop: SPACING.xl },
});
