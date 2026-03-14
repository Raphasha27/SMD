import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const { width } = Dimensions.get('window');

const options = [
  {
    icon: '🎓', label: 'Education', screen: 'EducationVerification',
    color: '#1565C0', desc: 'Schools, colleges, universities',
  },
  {
    icon: '🩺', label: 'Medical', screen: 'MedicalVerification',
    color: '#27AE60', desc: 'Doctors, nurses, specialists',
  },
  {
    icon: '⚖️', label: 'Legal', screen: 'LegalVerification',
    color: '#8E44AD', desc: 'Lawyers, advocates, notaries',
  },
];

export default function VerificationSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification Selection</Text>
        <Text style={styles.headerSub}>Choose the type of verification</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.chooseBetween}>Choose between</Text>

        {options.map((opt) => (
          <TouchableOpacity
            key={opt.label}
            style={styles.card}
            onPress={() => navigation.navigate(opt.screen)}
            activeOpacity={0.85}
          >
            <View style={[styles.iconBox, { backgroundColor: opt.color + '18' }]}>
              <Text style={styles.icon}>{opt.icon}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{opt.label}</Text>
              <Text style={styles.cardDesc}>{opt.desc}</Text>
            </View>
            <View style={[styles.arrow, { backgroundColor: opt.color }]}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            All verifications are cross-referenced with official South African government databases including DOE, HPCSA, SAQA, and Law Society registers.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: 55, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  backBtn: { marginBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  body: { padding: SPACING.lg },
  chooseBetween: { fontSize: 13, fontWeight: '700', color: COLORS.textLight, letterSpacing: 1, marginBottom: SPACING.md },
  card: {
    backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg,
    flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md,
    ...SHADOW.medium,
  },
  iconBox: { width: 60, height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  icon: { fontSize: 30 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  cardDesc: { fontSize: 13, color: COLORS.textLight, marginTop: 3 },
  arrow: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  infoBox: {
    backgroundColor: '#EBF5FB', borderRadius: RADIUS.lg, padding: SPACING.md,
    flexDirection: 'row', gap: 10, marginTop: SPACING.sm,
    borderLeftWidth: 4, borderLeftColor: COLORS.accent,
  },
  infoIcon: { fontSize: 18 },
  infoText: { flex: 1, fontSize: 13, color: COLORS.textLight, lineHeight: 20 },
});
