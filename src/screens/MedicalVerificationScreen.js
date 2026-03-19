import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const SAMPLE_DOCTORS = [
  { name: 'Dr. Sipho Nkosi', specialty: 'General Practitioner', hpcsa: 'MP-0234567', practice: 'Johannesburg, GP', status: 'VERIFIED' },
  { name: 'Dr. Sarah Dlamini', specialty: 'Paediatrician', hpcsa: 'MP-0345678', practice: 'Cape Town, WC', status: 'VERIFIED' },
  { name: 'Dr. John Doe', specialty: 'Specialist', hpcsa: 'N/A', practice: 'Unknown', status: 'UNABLE_TO_VERIFY' },
];

export default function MedicalVerificationScreen({ navigation }) {
  const [doctorName, setDoctorName] = useState('');
  const [hpcsaNumber, setHpcsaNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!doctorName.trim()) {
      Alert.alert('Required', 'Please enter a practitioner name.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = SAMPLE_DOCTORS.find(
        d => d.name.toLowerCase().includes(doctorName.toLowerCase())
      ) || SAMPLE_DOCTORS[2];

      navigation.navigate('VerificationResult', {
        type: 'Medical',
        name: found.name,
        reg: found.hpcsa,
        accredited: found.specialty,
        courses: found.practice,
        entityType: 'HPCSA Registered',
        status: found.status,
        searchTerm: doctorName,
      });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A5276', '#27AE60']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <Text style={styles.headerIcon}>🩺</Text>
          <Text style={styles.headerTitle}>Medical Verification</Text>
        </View>
        <Text style={styles.headerSub}>Verify HPCSA registered practitioners</Text>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Practitioner Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Dr. Sipho Nkosi"
            placeholderTextColor={COLORS.textMuted}
            value={doctorName}
            onChangeText={setDoctorName}
          />
          <Text style={styles.fieldLabel}>HPCSA Number (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. MP-0234567"
            placeholderTextColor={COLORS.textMuted}
            value={hpcsaNumber}
            onChangeText={setHpcsaNumber}
          />
          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify} disabled={loading}>
            <LinearGradient colors={['#1A5276', '#27AE60']} style={styles.verifyGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.verifyText}>{loading ? '🔍 Verifying…' : '🔍 Verify Practitioner'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* QR Scanner */}
        <TouchableOpacity
          style={styles.qrCard}
          onPress={() => navigation.navigate('QRScanner')}
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

        <View style={styles.infoCard}>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>ℹ️</Text>
          <Text style={styles.infoTitle}>About Medical Verification</Text>
          <Text style={styles.infoText}>
            Medical practitioners are verified against the{' '}
            <Text style={{ fontWeight: '700' }}>Health Professions Council of South Africa (HPCSA)</Text>{' '}
            database. Always confirm credentials before treatment.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SAMPLE PRACTITIONERS</Text>
          {SAMPLE_DOCTORS.slice(0, 2).map((doc, idx) => (
            <TouchableOpacity key={idx} style={styles.quickItem} onPress={() => setDoctorName(doc.name)}>
              <Text style={{ fontSize: 22 }}>🩺</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.quickName}>{doc.name}</Text>
                <Text style={styles.quickType}>{doc.specialty} • {doc.practice}</Text>
              </View>
              <Text style={{ color: '#27AE60', fontWeight: '600' }}>Select</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 55, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 12 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  headerIcon: { fontSize: 28 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  body: { flex: 1, padding: SPACING.lg },
  card: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOW.medium, marginBottom: SPACING.md },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: COLORS.background, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: 12, fontSize: 14, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border },
  verifyBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: SPACING.lg },
  verifyGradient: { paddingVertical: 14, alignItems: 'center' },
  verifyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  infoCard: { backgroundColor: '#E8F8F5', borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOW.small, marginBottom: SPACING.md },
  infoTitle: { fontSize: 15, fontWeight: '700', color: '#1A5276', marginBottom: 6 },
  infoText: { fontSize: 13, color: COLORS.textLight, lineHeight: 20 },
  qrCard: {
    backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg,
    flexDirection: 'row', alignItems: 'center', gap: 14, ...SHADOW.small,
    marginBottom: SPACING.md, borderWidth: 2, borderColor: '#27AE6030',
  },
  qrIconBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  qrTitle: { fontSize: 14, fontWeight: '800', color: '#27AE60', letterSpacing: 0.5 },
  qrSub: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  qrArrow: { fontSize: 24, color: '#27AE60', fontWeight: '800' },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: SPACING.sm },
  quickItem: { backgroundColor: '#fff', borderRadius: RADIUS.md, padding: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  quickName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  quickType: { fontSize: 12, color: COLORS.textLight },
});
