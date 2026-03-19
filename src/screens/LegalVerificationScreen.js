import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const SAMPLE_LAWYERS = [
  { name: 'Adv. Zanele Mokoena', specialty: 'Constitutional Law', barNumber: 'LSA-2021-JHB-0456', location: 'Johannesburg, GP', status: 'VERIFIED' },
  { name: 'Adv. Thabo Sithole', specialty: 'Commercial Law', barNumber: 'LSA-2019-CPT-0789', location: 'Cape Town, WC', status: 'VERIFIED' },
];

export default function LegalVerificationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [barNumber, setBarNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!name.trim()) { Alert.alert('Required', 'Please enter practitioner name.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = SAMPLE_LAWYERS.find(l => l.name.toLowerCase().includes(name.toLowerCase())) || SAMPLE_LAWYERS[0];
      navigation.navigate('VerificationResult', {
        type: 'Legal', name: found.name, reg: found.barNumber,
        accredited: found.specialty, courses: found.location,
        entityType: 'Law Society Registered', status: found.status, searchTerm: name,
      });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A235A', '#8E44AD']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <Text style={styles.headerIcon}>⚖️</Text>
          <Text style={styles.headerTitle}>Legal Verification</Text>
        </View>
        <Text style={styles.headerSub}>Verify Law Society registered practitioners</Text>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Practitioner Name *</Text>
          <TextInput style={styles.input} placeholder="e.g. Adv. Zanele Mokoena" placeholderTextColor={COLORS.textMuted} value={name} onChangeText={setName} />
          <Text style={styles.fieldLabel}>Bar/Roll Number (optional)</Text>
          <TextInput style={styles.input} placeholder="e.g. LSA-2021-JHB-0456" placeholderTextColor={COLORS.textMuted} value={barNumber} onChangeText={setBarNumber} />
          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify} disabled={loading}>
            <LinearGradient colors={['#4A235A', '#8E44AD']} style={styles.verifyGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SAMPLE PRACTITIONERS</Text>
          {SAMPLE_LAWYERS.map((l, idx) => (
            <TouchableOpacity key={idx} style={styles.quickItem} onPress={() => setName(l.name)}>
              <Text style={{ fontSize: 22 }}>⚖️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.quickName}>{l.name}</Text>
                <Text style={styles.quickType}>{l.specialty} • {l.location}</Text>
              </View>
              <Text style={{ color: '#8E44AD', fontWeight: '600' }}>Select</Text>
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
  qrCard: {
    backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg,
    flexDirection: 'row', alignItems: 'center', gap: 14, ...SHADOW.small,
    marginBottom: SPACING.md, borderWidth: 2, borderColor: '#8E44AD30',
  },
  qrIconBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  qrTitle: { fontSize: 14, fontWeight: '800', color: '#8E44AD', letterSpacing: 0.5 },
  qrSub: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  qrArrow: { fontSize: 24, color: '#8E44AD', fontWeight: '800' },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: SPACING.sm },
  quickItem: { backgroundColor: '#fff', borderRadius: RADIUS.md, padding: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  quickName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  quickType: { fontSize: 12, color: COLORS.textLight },
});
