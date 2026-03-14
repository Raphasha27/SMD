import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const MENTORS = [
  { name: 'Dr. Thandiwe Mthembu', field: 'Medical / Healthcare', exp: '18 yrs', rating: 4.9, sessions: 340, avatar: '👩‍⚕️', available: true },
  { name: 'Adv. Kabelo Sithole', field: 'Legal / Corporate', exp: '12 yrs', rating: 4.8, sessions: 210, avatar: '👨‍⚖️', available: true },
  { name: 'Prof. Naledi Dlamini', field: 'Business & Finance', exp: '20 yrs', rating: 5.0, sessions: 580, avatar: '👩‍💼', available: false },
  { name: 'Eng. Thabo Mokoena', field: 'Engineering / Tech', exp: '15 yrs', rating: 4.7, sessions: 190, avatar: '👨‍🔧', available: true },
];

export default function MentorshipScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A235A', '#8E44AD']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentorship Hub</Text>
        <Text style={styles.headerSub}>AI-matched · Verified mentors · All professions</Text>

        <View style={styles.aiMatchBanner}>
          <Text style={{ fontSize: 20 }}>🤖</Text>
          <Text style={styles.aiMatchText}>AI Mentorship Matching: Based on your verified profile and CPD goals, we recommend starting with a Business & Finance mentor.</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>VERIFIED MENTORS</Text>

        {MENTORS.map((mentor, idx) => (
          <View key={idx} style={styles.mentorCard}>
            <View style={styles.mentorTop}>
              <View style={styles.avatarCircle}>
                <Text style={{ fontSize: 28 }}>{mentor.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.mentorName}>{mentor.name}</Text>
                  <View style={[styles.availBadge, { backgroundColor: mentor.available ? '#D5F5E3' : '#F4F6F7' }]}>
                    <Text style={[styles.availText, { color: mentor.available ? '#27AE60' : COLORS.textMuted }]}>
                      {mentor.available ? '● Available' : '○ Busy'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.mentorField}>{mentor.field}</Text>
                <View style={styles.mentorMeta}>
                  <Text style={styles.metaItem}>⭐ {mentor.rating}</Text>
                  <Text style={styles.metaItem}>👥 {mentor.sessions} sessions</Text>
                  <Text style={styles.metaItem}>📅 {mentor.exp} exp</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.msgBtn}>
                <Text style={styles.msgBtnText}>💬 Message</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.bookBtn, !mentor.available && styles.bookBtnDisabled]}
                disabled={!mentor.available}
              >
                <LinearGradient
                  colors={mentor.available ? ['#4A235A', '#8E44AD'] : ['#BDC3C7', '#95A5A6']}
                  style={styles.bookGrad}
                >
                  <Text style={styles.bookBtnText}>📅 Book Session</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.becomeBox}>
          <Text style={styles.becomeTitle}>🌟 Become a Mentor</Text>
          <Text style={styles.becomeSub}>Share your expertise with emerging professionals. Apply with your verified Sumbandila profile.</Text>
          <TouchableOpacity style={styles.becomeBtn}>
            <Text style={styles.becomeBtnText}>Apply to Mentor ›</Text>
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
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 14 },
  aiMatchBanner: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.lg, padding: 12, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  aiMatchText: { flex: 1, color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 18 },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 12 },
  mentorCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.medium },
  mentorTop: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  avatarCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0E6FF', justifyContent: 'center', alignItems: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  mentorName: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  availBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  availText: { fontSize: 11, fontWeight: '700' },
  mentorField: { fontSize: 12, color: '#8E44AD', fontWeight: '700', marginTop: 2 },
  mentorMeta: { flexDirection: 'row', gap: 12, marginTop: 6 },
  metaItem: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 10 },
  msgBtn: { flex: 1, borderWidth: 1.5, borderColor: '#8E44AD', borderRadius: RADIUS.md, paddingVertical: 10, alignItems: 'center' },
  msgBtnText: { color: '#8E44AD', fontWeight: '700', fontSize: 13 },
  bookBtn: { flex: 1, borderRadius: RADIUS.md, overflow: 'hidden' },
  bookBtnDisabled: { opacity: 0.6 },
  bookGrad: { paddingVertical: 10, alignItems: 'center' },
  bookBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  becomeBox: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOW.small, borderLeftWidth: 4, borderLeftColor: '#8E44AD' },
  becomeTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  becomeSub: { fontSize: 13, color: COLORS.textLight, lineHeight: 20, marginBottom: 12 },
  becomeBtn: { backgroundColor: '#8E44AD', borderRadius: RADIUS.md, paddingVertical: 11, alignItems: 'center' },
  becomeBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
