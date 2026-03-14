import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const ITEMS = [
  { label: 'CIPC Registration', status: 'Valid', expiry: 'Dec 2026', icon: '✅', ok: true },
  { label: 'Tax Clearance (SARS)', status: 'Expiring', expiry: '14 days left', icon: '⚠️', ok: false },
  { label: 'BBBEE Certificate', status: 'Expiring', expiry: '30 days left', icon: '⚠️', ok: false },
  { label: 'VAT Registration', status: 'Valid', expiry: 'Ongoing', icon: '✅', ok: true },
  { label: 'UIF / PAYE', status: 'Valid', expiry: 'Ongoing', icon: '✅', ok: true },
];

export default function ComplianceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#E67E22']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SME Compliance Portal</Text>
        <Text style={styles.headerSub}>Tax · BBBEE · CIPC · Smart Renewal Alerts</Text>
      </LinearGradient>

      <ScrollView style={styles.body}>
        <View style={styles.scoreCard}>
          <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.scoreGrad}>
            <Text style={styles.scoreVal}>87%</Text>
            <Text style={styles.scoreTitle}>Compliance Score</Text>
            <Text style={styles.scoreSub}>2 items need attention</Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>COMPLIANCE STATUS</Text>
        {ITEMS.map((item, idx) => (
          <View key={idx} style={[styles.item, !item.ok && styles.itemWarn]}>
            <Text style={{ fontSize: 22 }}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={[styles.itemExpiry, !item.ok && { color: COLORS.warning }]}>{item.expiry}</Text>
            </View>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: item.ok ? COLORS.background : COLORS.primary }]}>
              <Text style={[styles.actionText, { color: item.ok ? COLORS.textLight : '#fff' }]}>
                {item.ok ? 'View' : 'Renew →'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.aiBox}>
          <Text style={styles.aiTitle}>🤖 AI Compliance Assistant</Text>
          <Text style={styles.aiSub}>Need help with BBBEE affidavits or SARS e-filing? Our AI guides you step by step.</Text>
          <TouchableOpacity style={styles.aiBtn} onPress={() => navigation.navigate('AISupport')}>
            <Text style={styles.aiBtnText}>Get AI Help →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 10 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  body: { flex: 1, padding: SPACING.lg },
  scoreCard: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.lg, ...SHADOW.large },
  scoreGrad: { padding: SPACING.xl, alignItems: 'center' },
  scoreVal: { color: '#fff', fontSize: 56, fontWeight: '900' },
  scoreTitle: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  scoreSub: { color: COLORS.secondary, fontSize: 12, marginTop: 4, fontWeight: '600' },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 10 },
  item: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  itemWarn: { borderLeftWidth: 4, borderLeftColor: COLORS.warning },
  itemLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  itemExpiry: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  actionBtn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  actionText: { fontSize: 12, fontWeight: '700' },
  aiBox: { backgroundColor: '#EBF5FB', borderRadius: RADIUS.xl, padding: SPACING.lg, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  aiTitle: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginBottom: 6 },
  aiSub: { fontSize: 13, color: COLORS.textLight, lineHeight: 20, marginBottom: 12 },
  aiBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 11, alignItems: 'center' },
  aiBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
