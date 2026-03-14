import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const SAMPLE_INSTITUTIONS = [
  { name: 'St Stithians College', reg: 'DOE-12345-GP', accredited: 'CHE, QCTO, Umalusi', courses: 'NSC, IEB', type: 'Private School', status: 'VERIFIED' },
  { name: 'University of Johannesburg', reg: 'DOE-00234-GP', accredited: 'CHE, SAQA', courses: 'Various Degrees', type: 'University', status: 'VERIFIED' },
  { name: 'ABC College', reg: 'DOE-12345', accredited: 'CHE, QCTO', courses: 'Various Diplomas', type: 'College', status: 'VERIFIED' },
  { name: 'Unaccredited Institute', reg: 'N/A', accredited: 'None', courses: 'N/A', type: 'Private', status: 'UNABLE_TO_VERIFY' },
];

export default function EducationVerificationScreen({ navigation }) {
  const [institutionName, setInstitutionName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [educationName, setEducationName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!institutionName.trim()) {
      Alert.alert('Required', 'Please enter an institution name.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = SAMPLE_INSTITUTIONS.find(
        i => i.name.toLowerCase().includes(institutionName.toLowerCase())
      ) || SAMPLE_INSTITUTIONS[0];

      navigation.navigate('VerificationResult', {
        type: 'Education',
        name: found.name,
        reg: found.reg,
        accredited: found.accredited,
        courses: found.courses,
        entityType: found.type,
        status: found.status,
        searchTerm: institutionName,
      });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <Text style={styles.headerIcon}>🎓</Text>
          <Text style={styles.headerTitle}>Education Verification</Text>
        </View>
        <Text style={styles.headerSub}>Search for schools, colleges & universities</Text>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Institution Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. St Stithians College"
            placeholderTextColor={COLORS.textMuted}
            value={institutionName}
            onChangeText={setInstitutionName}
          />

          <Text style={styles.fieldLabel}>Registration # (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. DOE-12345-GP"
            placeholderTextColor={COLORS.textMuted}
            value={regNumber}
            onChangeText={setRegNumber}
          />

          <Text style={styles.fieldLabel}>Education Name (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. National Senior Certificate"
            placeholderTextColor={COLORS.textMuted}
            value={educationName}
            onChangeText={setEducationName}
          />

          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={handleVerify}
            disabled={loading}
          >
            <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.verifyGradient}>
              <Text style={styles.verifyText}>
                {loading ? '🔍 Verifying…' : '🔍 Verify Institution'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* QR Scanner */}
        <TouchableOpacity
          style={styles.qrCard}
          onPress={() => Alert.alert('QR Scanner', 'Point camera at certificate QR code to verify instantly.')}
        >
          <View style={styles.qrIconBox}>
            <Text style={{ fontSize: 32 }}>📷</Text>
          </View>
          <View>
            <Text style={styles.qrTitle}>SCAN QR CERTIFICATE</Text>
            <Text style={styles.qrSub}>Instantly verify using QR code</Text>
          </View>
          <Text style={styles.qrArrow}>›</Text>
        </TouchableOpacity>

        {/* Quick Search Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POPULAR INSTITUTIONS</Text>
          {SAMPLE_INSTITUTIONS.slice(0, 3).map((inst, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.quickItem}
              onPress={() => setInstitutionName(inst.name)}
            >
              <Text style={styles.quickIcon}>🏫</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.quickName}>{inst.name}</Text>
                <Text style={styles.quickType}>{inst.type}</Text>
              </View>
              <Text style={{ color: COLORS.accent, fontWeight: '600' }}>Select</Text>
            </TouchableOpacity>
          ))}
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
  backBtn: { marginBottom: 12 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  headerIcon: { fontSize: 28 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  body: { flex: 1, padding: SPACING.lg },
  card: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOW.medium, marginBottom: SPACING.md },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: COLORS.background, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md,
    paddingVertical: 12, fontSize: 14, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border,
  },
  verifyBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: SPACING.lg },
  verifyGradient: { paddingVertical: 14, alignItems: 'center' },
  verifyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  qrCard: {
    backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg,
    flexDirection: 'row', alignItems: 'center', gap: 14, ...SHADOW.small,
    marginBottom: SPACING.md, borderWidth: 2, borderColor: COLORS.primary + '30',
  },
  qrIconBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  qrTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary, letterSpacing: 0.5 },
  qrSub: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  qrArrow: { fontSize: 24, color: COLORS.primary, fontWeight: '800' },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: SPACING.sm },
  quickItem: {
    backgroundColor: '#fff', borderRadius: RADIUS.md, padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small,
  },
  quickIcon: { fontSize: 20 },
  quickName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  quickType: { fontSize: 12, color: COLORS.textLight },
});
