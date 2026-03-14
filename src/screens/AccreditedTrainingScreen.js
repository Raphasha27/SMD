import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const COURSES = [
  { id: '1', title: 'IFRS 17 Insurance Contracts', provider: 'SAICA Accredited', cpd: 8, price: 'R599', duration: '6 hours', category: 'Finance', rating: 4.8, enrolled: 1240 },
  { id: '2', title: 'BBBEE Compliance for SMMEs', provider: 'dti Approved', cpd: 5, price: 'R399', duration: '4 hours', category: 'Legal/Business', rating: 4.7, enrolled: 890 },
  { id: '3', title: 'Medico-Legal Documentation', provider: 'HPCSA Endorsed', cpd: 6, price: 'R450', duration: '5 hours', category: 'Medical', rating: 4.9, enrolled: 2100 },
  { id: '4', title: 'Construction Project Management', provider: 'ECSA Accredited', cpd: 10, price: 'R799', duration: '8 hours', category: 'Engineering', rating: 4.6, enrolled: 670 },
  { id: '5', title: 'Tax Compliance & SARS e-Filing', provider: 'SAICA Accredited', cpd: 4, price: 'Free', duration: '3 hours', category: 'Finance', rating: 4.5, enrolled: 3400 },
];

const CATEGORIES = ['All', 'Finance', 'Medical', 'Legal/Business', 'Engineering'];

export default function AccreditedTrainingScreen({ navigation }) {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = COURSES.filter(c => selectedCat === 'All' || c.category === selectedCat);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#E67E22']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <Text style={styles.headerIcon}>📜</Text>
          <View>
            <Text style={styles.headerTitle}>Accredited Learning Hub</Text>
            <Text style={styles.headerSub}>CPD · Micro-credentials · Skill Assessments</Text>
          </View>
        </View>

        {/* CPD Total */}
        <View style={styles.cpdSummary}>
          <View style={styles.cpdStat}>
            <Text style={styles.cpdStatValue}>12</Text>
            <Text style={styles.cpdStatLabel}>Points Earned</Text>
          </View>
          <View style={styles.cpdDivider} />
          <View style={styles.cpdStat}>
            <Text style={styles.cpdStatValue}>25</Text>
            <Text style={styles.cpdStatLabel}>Annual Target</Text>
          </View>
          <View style={styles.cpdDivider} />
          <View style={styles.cpdStat}>
            <Text style={styles.cpdStatValue}>3</Text>
            <Text style={styles.cpdStatLabel}>Completed</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Filters */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCat === cat && styles.chipActive]}
              onPress={() => setSelectedCat(cat)}
            >
              <Text style={[styles.chipText, selectedCat === cat && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>AVAILABLE COURSES ({filtered.length})</Text>

        {filtered.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard} activeOpacity={0.9}>
            <View style={styles.courseTop}>
              <View style={styles.courseIconBox}>
                <Text style={{ fontSize: 24 }}>
                  {course.category === 'Finance' ? '💰' :
                   course.category === 'Medical' ? '🩺' :
                   course.category === 'Engineering' ? '⚙️' : '⚖️'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseProvider}>{course.provider}</Text>
              </View>
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>{course.price}</Text>
              </View>
            </View>

            <View style={styles.courseMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⏱</Text>
                <Text style={styles.metaText}>{course.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>📊</Text>
                <Text style={styles.metaText}>{course.cpd} CPD pts</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⭐</Text>
                <Text style={styles.metaText}>{course.rating}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>👥</Text>
                <Text style={styles.metaText}>{course.enrolled.toLocaleString()}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.enrollBtn}>
              <LinearGradient colors={['#E67E22', '#F39C12']} style={styles.enrollGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.enrollText}>Enrol & Earn {course.cpd} CPD Points →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Provider Partner CTA */}
        <View style={styles.partnerBox}>
          <Text style={styles.partnerTitle}>🏫 Are you a Training Provider?</Text>
          <Text style={styles.partnerText}>
            List your accredited courses on Sumbandila and reach thousands of verified professionals.
          </Text>
          <TouchableOpacity style={styles.partnerBtn}>
            <Text style={styles.partnerBtnText}>Partner With Us ›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: SPACING.lg, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 10 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  headerIcon: { fontSize: 32 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 },
  cpdSummary: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.lg, padding: 14, gap: 4 },
  cpdStat: { flex: 1, alignItems: 'center' },
  cpdStatValue: { color: '#fff', fontSize: 26, fontWeight: '900' },
  cpdStatLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, textAlign: 'center' },
  cpdDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },
  filterRow: { paddingHorizontal: SPACING.md, paddingVertical: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: RADIUS.full, backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
  chipText: { fontSize: 12, fontWeight: '600', color: COLORS.textLight },
  chipTextActive: { color: '#fff' },
  body: { flex: 1, paddingHorizontal: SPACING.md },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 10 },
  courseCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.medium },
  courseTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  courseIconBox: { width: 50, height: 50, borderRadius: 14, backgroundColor: '#FEF9E7', justifyContent: 'center', alignItems: 'center' },
  courseTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, lineHeight: 19 },
  courseProvider: { fontSize: 11, color: '#E67E22', fontWeight: '700', marginTop: 2 },
  priceBadge: { backgroundColor: '#EAFAF1', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  priceText: { color: '#27AE60', fontWeight: '900', fontSize: 13 },
  courseMeta: { flexDirection: 'row', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaIcon: { fontSize: 13 },
  metaText: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
  enrollBtn: { borderRadius: RADIUS.md, overflow: 'hidden' },
  enrollGrad: { paddingVertical: 12, alignItems: 'center' },
  enrollText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  partnerBox: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOW.small, borderLeftWidth: 4, borderLeftColor: '#E67E22' },
  partnerTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  partnerText: { fontSize: 13, color: COLORS.textLight, lineHeight: 20, marginBottom: 12 },
  partnerBtn: { backgroundColor: '#E67E22', borderRadius: RADIUS.md, paddingVertical: 10, alignItems: 'center' },
  partnerBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
