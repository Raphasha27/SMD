import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const { width } = Dimensions.get('window');

const PROFILES = [
  { name: 'Dr. John Doe', title: 'Verified Doctor', profession: 'General Practitioner', year: 2023, location: 'Johannesburg, GP', verified: true, avatar: '👨‍⚕️', skills: ['HPCSA Registered', 'BHSc Medicine', '5 yrs exp'] },
  { name: 'Adv. Zanele Mokoena', title: 'Verified Legal', profession: 'Constitutional Lawyer', year: 2021, location: 'Cape Town, WC', verified: true, avatar: '👩‍⚖️', skills: ['Law Society SA', 'LLB UCT', '8 yrs exp'] },
  { name: 'Prof. Sipho Nkosi', title: 'Verified Educator', profession: 'Senior Lecturer', year: 2022, location: 'Pretoria, GP', verified: true, avatar: '👨‍🏫', skills: ['CHE Accredited', 'PhD Education', '12 yrs exp'] },
  { name: 'Ms. Sarah Dlamini', title: 'Verified Engineer', profession: 'Civil Engineer', year: 2023, location: 'Durban, KZN', verified: true, avatar: '👩‍🔧', skills: ['ECSA Registered', 'BSc Civil', '6 yrs exp'] },
];

const PROFESSIONS = ['All', 'Doctor', 'Lawyer', 'Engineer', 'Educator', 'Accountant'];

export default function CareerHubScreen({ navigation }) {
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const filtered = PROFILES.filter(p => {
    if (selectedProfession !== 'All' && !p.profession.toLowerCase().includes(selectedProfession.toLowerCase())) return false;
    if (locationSearch && !p.location.toLowerCase().includes(locationSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#0D9E87']} style={styles.header}>
        <Text style={styles.headerTitle}>Verified Talent Pool Search</Text>
        <Text style={styles.headerSub}>Find accredited professionals instantly</Text>

        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Text style={styles.searchIcon}>📍</Text>
            <TextInput
              style={styles.searchText}
              placeholder="Search in Location…"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={locationSearch}
              onChangeText={setLocationSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={{ fontSize: 18 }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PROFESSIONS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.chip, selectedProfession === p && styles.chipActive]}
              onPress={() => setSelectedProfession(p)}
            >
              <Text style={[styles.chipText, selectedProfession === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.chip, verifiedOnly && styles.chipActive]}
            onPress={() => setVerifiedOnly(!verifiedOnly)}
          >
            <Text style={[styles.chipText, verifiedOnly && styles.chipTextActive]}>✓ Verified Only</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>PROFILES</Text>
          <TouchableOpacity style={styles.filterIconBtn}>
            <Text style={styles.filterIconText}>⚡ Filters</Text>
          </TouchableOpacity>
        </View>

        {filtered.map((profile, idx) => (
          <View key={idx} style={styles.profileCard}>
            <View style={styles.profileTop}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{profile.avatar}</Text>
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  {profile.verified && <Text style={styles.verifiedBadge}>✓</Text>}
                </View>
                <Text style={styles.profileTitle}>{profile.title}</Text>
                <Text style={styles.profileProf}>{profile.profession} · {profile.location}</Text>
                <Text style={styles.profileYear}>Profession in {profile.year} · {profile.name}</Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.skillsRow}>
              {profile.skills.map((skill, si) => (
                <View key={si} style={styles.skillChip}><Text style={styles.skillText}>{skill}</Text></View>
              ))}
            </ScrollView>

            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.interviewBtn}>
                <Text style={styles.interviewText}>📅 Book Interview</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cvBtn}>
                <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.cvGrad}>
                  <Text style={styles.cvText}>📄 View Full Verified CV</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Verified HR Section */}
        <View style={styles.hrSection}>
          <View style={styles.hrHeader}>
            <Text style={styles.hrTitle}>🏢 Verified HR</Text>
            <View style={styles.newTagGreen}><Text style={styles.newTagText}>NEW</Text></View>
          </View>
          <Text style={styles.hrSub}>Recruitment · Background Checks · Onboarding Tools</Text>

          {[
            { icon: '🔎', title: 'Recruitment Portal', desc: 'Post verified job listings targeting certified professionals' },
            { icon: '🛡️', title: 'Background Checks', desc: 'Criminal records, credit checks & academic history verification' },
            { icon: '📋', title: 'Onboarding Tools', desc: 'Streamlined onboarding with pre-verified candidate profiles' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.hrCard}>
              <View style={styles.hrIconBox}><Text style={{ fontSize: 22 }}>{item.icon}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.hrCardTitle}>{item.title}</Text>
                <Text style={styles.hrCardDesc}>{item.desc}</Text>
              </View>
              <Text style={{ color: COLORS.accent, fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: SPACING.lg, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 2 },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 14 },
  searchRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  searchInput: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 10, gap: 8 },
  searchIcon: { fontSize: 15 },
  searchText: { flex: 1, color: '#fff', fontSize: 13 },
  filterBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  filterRow: { paddingHorizontal: SPACING.md, paddingVertical: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: RADIUS.full, backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: COLORS.textLight },
  chipTextActive: { color: '#fff' },
  body: { flex: 1, paddingHorizontal: SPACING.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5 },
  filterIconBtn: { backgroundColor: COLORS.background, borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: COLORS.border },
  filterIconText: { fontSize: 12, color: COLORS.text, fontWeight: '600' },
  profileCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.medium },
  profileTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  avatarCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28 },
  profileInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  profileName: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  verifiedBadge: { backgroundColor: '#D5F5E3', color: '#27AE60', fontWeight: '900', fontSize: 12, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  profileTitle: { fontSize: 12, color: COLORS.accent, fontWeight: '700', marginTop: 2 },
  profileProf: { fontSize: 12, color: COLORS.textLight, marginTop: 1 },
  profileYear: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  skillsRow: { marginBottom: 12 },
  skillChip: { backgroundColor: '#EBF5FB', borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 5, marginRight: 6, borderWidth: 1, borderColor: '#BEE3F8' },
  skillText: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  profileActions: { flexDirection: 'row', gap: 10 },
  interviewBtn: { flex: 1, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 10, alignItems: 'center' },
  interviewText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  cvBtn: { flex: 1, borderRadius: RADIUS.md, overflow: 'hidden' },
  cvGrad: { paddingVertical: 10, alignItems: 'center' },
  cvText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  hrSection: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.medium },
  hrHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  hrTitle: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  newTagGreen: { backgroundColor: '#D5F5E3', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  newTagText: { color: '#27AE60', fontSize: 10, fontWeight: '900' },
  hrSub: { fontSize: 12, color: COLORS.textLight, marginBottom: 14 },
  hrCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  hrIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  hrCardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  hrCardDesc: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
});
