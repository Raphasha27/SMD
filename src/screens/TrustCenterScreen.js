import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function TrustCenterScreen({ navigation }) {
  const sources = [
    { name: 'SAQA', desc: 'South African Qualifications Authority', domain: 'Education Verification' },
    { name: 'HPCSA', desc: 'Health Professions Council of South Africa', domain: 'Medical Registration' },
    { name: 'LPC', desc: 'Legal Practice Council', domain: 'Legal Standing' },
    { name: 'CIPC', desc: 'Companies and Intellectual Property Commission', domain: 'Business Compliance' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Trust Center</Text>
      <Text style={styles.subtitle}>Our Commitment to Transparency & Accuracy 🇿🇦</Text>

      {/* POPIA Compliance Card */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.icon}>🔐</Text>
          <Text style={styles.cardTitle}>POPIA Compliant</Text>
        </View>
        <Text style={styles.cardText}>
          Sumbandila is built with the Protection of Personal Information Act at its core. We do not store sensitive private data without explicit user consent.
        </Text>
      </View>

      {/* Methodology Section */}
      <Text style={styles.sectionTitle}>Verification Methodology</Text>
      <View style={styles.methodCard}>
        <View style={styles.step}>
          <View style={styles.dot} />
          <Text style={styles.stepText}>Request initiated by verified user.</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.dot} />
          <Text style={styles.stepText}>Adapter connects to official national registry.</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.dot} />
          <Text style={styles.stepText}>Real-time matching with zero data caching.</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.dot} />
          <Text style={styles.stepText}>Certified result delivered with timestamp.</Text>
        </View>
      </View>

      {/* Data Sources */}
      <Text style={styles.sectionTitle}>Official Data Sources</Text>
      {sources.map((item, index) => (
        <View key={index} style={styles.sourceItem}>
          <View style={styles.sourceBrand}>
            <Text style={styles.sourceName}>{item.name}</Text>
          </View>
          <View style={styles.sourceDetails}>
            <Text style={styles.sourceDesc}>{item.desc}</Text>
            <Text style={styles.sourceDomain}>{item.domain}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.btn}
        onPress={() => Linking.openURL('https://sumbandila.co.za/privacy')}
      >
        <Text style={styles.btnText}>View Full Privacy Policy</Text>
      </TouchableOpacity>
      
      <Text style={styles.footer}>
        Built by Kivoc Dynamic Technology. 
        Promoting trust in the South African digital economy.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.primary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: 30 },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    padding: 20,
    ...SHADOW.medium,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.secondary,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { fontSize: 24, marginRight: 10 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  cardText: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 15, marginTop: 10 },
  methodCard: {
    backgroundColor: '#EEF2FF',
    padding: 20,
    borderRadius: RADIUS.lg,
    marginBottom: 30,
  },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginRight: 12 },
  stepText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  sourceItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    ...SHADOW.small,
  },
  sourceBrand: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 15,
  },
  sourceName: { fontSize: 12, fontWeight: '900', color: COLORS.primary },
  sourceDesc: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  sourceDomain: { fontSize: 12, color: COLORS.textMuted },
  btn: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '800' },
  footer: { textAlign: 'center', marginTop: 40, fontSize: 11, color: COLORS.textMuted, opacity: 0.6 },
});
