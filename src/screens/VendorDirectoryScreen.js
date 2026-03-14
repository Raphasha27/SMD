import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const VENDORS = [
  { name: 'TechBuild SA (Pty) Ltd', cat: 'IT Services', bbbee: 'Level 2', verified: true, badge: '🏅' },
  { name: 'GreenBuild Engineers', cat: 'Civil Engineering', bbbee: 'Level 1', verified: true, badge: '🏅' },
  { name: 'MediSupply Africa', cat: 'Medical Supplies', bbbee: 'Level 3', verified: true, badge: '🏅' },
  { name: 'LexConsult Ltd', cat: 'Legal Services', bbbee: 'Level 2', verified: true, badge: '🏅' },
];

export default function VendorDirectoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#0D9E87']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verified Vendor Directory</Text>
        <Text style={styles.headerSub}>Digital Trust Badges · BBBEE Verified · CIPC Registered</Text>
      </LinearGradient>
      <ScrollView style={styles.body}>
        <Text style={styles.sectionTitle}>VERIFIED VENDORS</Text>
        {VENDORS.map((v, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.badge}>{v.badge}</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.vendorName}>{v.name}</Text>
                {v.verified && <Text style={styles.verifiedMark}>✓ Verified</Text>}
              </View>
              <Text style={styles.vendorCat}>{v.cat}</Text>
              <Text style={styles.vendorBbbee}>BBBEE {v.bbbee}</Text>
            </View>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.registerBox}>
          <Text style={styles.registerTitle}>🏢 Register Your Business</Text>
          <Text style={styles.registerSub}>Join thousands of verified vendors on Sumbandila.</Text>
          <TouchableOpacity style={styles.registerBtn}>
            <Text style={styles.registerBtnText}>Register as Vendor →</Text>
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
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, ...SHADOW.small },
  badge: { fontSize: 28 },
  vendorName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  verifiedMark: { backgroundColor: '#D5F5E3', color: '#27AE60', fontSize: 10, fontWeight: '900', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  vendorCat: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  vendorBbbee: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  viewBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  viewBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  registerBox: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOW.small, borderLeftWidth: 4, borderLeftColor: '#0D9E87', marginTop: 4 },
  registerTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  registerSub: { fontSize: 13, color: COLORS.textLight, marginBottom: 12 },
  registerBtn: { backgroundColor: '#0D9E87', borderRadius: RADIUS.md, paddingVertical: 11, alignItems: 'center' },
  registerBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
