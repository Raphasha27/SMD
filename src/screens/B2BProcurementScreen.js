import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

export default function B2BProcurementScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1A237E']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>B2B Procurement & Tenders</Text>
        <Text style={styles.headerSub}>Verified vendor matching · Automated compliance</Text>
      </LinearGradient>
      <ScrollView style={styles.body}>
        <Text style={styles.info}>Access the full Tender & Vendor Portal from the Business Tools tab.</Text>
        {[
          { icon: '📋', title: 'Browse Open Tenders', desc: 'Eskom, Transnet, Dept of Health & more' },
          { icon: '🤝', title: 'Register as Vendor', desc: 'Get your verified vendor listing' },
          { icon: '⚡', title: 'Auto-Vetted Shortlist', desc: 'AI pre-vetting based on compliance score' },
          { icon: '📊', title: 'Tender Analytics', desc: 'Track applications and success rates' },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.card} onPress={() => navigation.getParent()?.navigate('Biz Tools')}>
            <View style={styles.iconBox}><Text style={{ fontSize: 26 }}>{item.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <Text style={{ color: COLORS.accent, fontSize: 20 }}>›</Text>
          </TouchableOpacity>
        ))}
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
  info: { fontSize: 13, color: COLORS.textLight, marginBottom: SPACING.md, backgroundColor: '#EBF5FB', padding: 12, borderRadius: RADIUS.md },
  card: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10, ...SHADOW.small },
  iconBox: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  cardDesc: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
});
