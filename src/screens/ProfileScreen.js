import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Alert, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const CV_DATA = {
  name: 'User Moname',
  email: 'user.moname@gmail.com',
  plan: 'Individual Pro',
  qualifications: [
    { label: 'BCom Accounting – UNISA', verified: true, year: '2019' },
    { label: 'CTA – SAICA Registered', verified: true, year: '2021' },
    { label: 'MBA – Wits Business School', verified: false, year: '2023' },
  ],
  cpd: [
    { label: 'IFRS 17 Implementation', points: 5, date: 'Jan 2026' },
    { label: 'SME Financial Management', points: 3, date: 'Nov 2025' },
    { label: 'Tax Compliance Workshop', points: 4, date: 'Sep 2025' },
  ],
  applications: [
    { grant: 'SETA Grant', status: 'Submitted', color: '#27AE60' },
    { grant: 'Corporate Grant', status: 'Under Review', color: '#F39C12' },
    { grant: 'Corporate Grant', status: 'Under Review', color: '#F39C12' },
  ],
};

export default function ProfileScreen({ navigation }) {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          {['profile', 'settings'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'profile' ? '👤 Profile' : '⚙️ Settings'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {activeTab === 'profile' && (
          <>
            {/* User Info */}
            <View style={styles.userCard}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{CV_DATA.name}</Text>
                <Text style={styles.userEmail}>{CV_DATA.email}</Text>
                <View style={styles.planRow}>
                  <Text style={styles.planBadge}>👑 {CV_DATA.plan}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon.')}>
                <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 13 }}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Verified Digital CV */}
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>VERIFIED DIGITAL CV</Text>
                <View style={styles.newTag}><Text style={styles.newTagText}>PRO</Text></View>
              </View>
              <View style={styles.cvCard}>
                <View style={styles.cvHeader}>
                  <Text style={{ fontSize: 22 }}>📄</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cvTitle}>Sumbandila Certified CV</Text>
                    <Text style={styles.cvSub}>Every credential cryptographically verified</Text>
                  </View>
                  <TouchableOpacity style={styles.applyBtn}>
                    <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.applyGrad}>
                      <Text style={styles.applyText}>⚡ Instant Apply</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <Text style={styles.qualTitle}>Qualifications</Text>
                {CV_DATA.qualifications.map((q, idx) => (
                  <View key={idx} style={styles.qualRow}>
                    <Text style={[styles.qualCheck, { color: q.verified ? COLORS.success : COLORS.textMuted }]}>
                      {q.verified ? '✓' : '○'}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.qualLabel}>{q.label}</Text>
                      <Text style={styles.qualYear}>{q.year}</Text>
                    </View>
                    {q.verified && (
                      <View style={styles.verifiedChip}>
                        <Text style={styles.verifiedChipText}>🛡️ Verified</Text>
                      </View>
                    )}
                    {!q.verified && (
                      <TouchableOpacity style={styles.verifyNowBtn}
                        onPress={() => navigation.navigate('VerificationSelection')}>
                        <Text style={styles.verifyNowText}>Verify ›</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                <TouchableOpacity style={styles.shareCV}>
                  <Text style={styles.shareCVText}>📤 Share Verified CV Link</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* CPD Tracker */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CPD TRACKER</Text>
              <View style={styles.cpdCard}>
                <View style={styles.cpdProgress}>
                  <Text style={styles.cpdPoints}>12 / 25</Text>
                  <Text style={styles.cpdLabel}>CPD Points this year</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '48%' }]} />
                  </View>
                </View>
                {CV_DATA.cpd.map((item, idx) => (
                  <View key={idx} style={styles.cpdItem}>
                    <View style={styles.cpdIcon}><Text style={{ fontSize: 18 }}>📘</Text></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cpdItemLabel}>{item.label}</Text>
                      <Text style={styles.cpdItemDate}>{item.date}</Text>
                    </View>
                    <View style={styles.cpdPts}>
                      <Text style={styles.cpdPtsText}>+{item.points} pts</Text>
                    </View>
                  </View>
                ))}
                <TouchableOpacity style={styles.addCpdBtn} onPress={() => navigation.navigate('AccreditedTraining')}>
                  <Text style={styles.addCpdText}>+ Add CPD Activity</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Manage Subscription */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>MANAGE SUBSCRIPTION</Text>
              <TouchableOpacity style={styles.subCard} onPress={() => navigation.navigate('Subscription')}>
                <View style={styles.subLeft}>
                  <Text style={styles.subIcon}>👑</Text>
                  <View>
                    <Text style={styles.subPlan}>{CV_DATA.plan}</Text>
                    <Text style={styles.subRenew}>Renews Apr 13, 2026 · R49.99/mo</Text>
                  </View>
                </View>
                <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Manage ›</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Links */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
              {[
                { icon: '📋', label: 'Verification History', screen: 'VerificationSelection' },
                { icon: '💰', label: 'Funding Applications', screen: 'ApplicationTracker' },
                { icon: '🏅', label: 'My Digital Badges', screen: 'VendorDirectory' },
                { icon: '🛡️', label: 'Trust & Compliance', screen: 'TrustCenter' },
                { icon: '🎓', label: 'Accredited Learning', screen: 'AccreditedTraining' },
              ].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.quickItem}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                  <Text style={styles.quickLabel}>{item.label}</Text>
                  <Text style={{ color: COLORS.textMuted }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* About / Credit */}
            <View style={styles.aboutCard}>
              <View style={styles.aboutLogo}>
                <Text style={{ fontSize: 28 }}>⚡</Text>
              </View>
              <Text style={styles.aboutTitle}>Built by Kivoc Dynamic Technology</Text>
              <Text style={styles.aboutSub}>github.com/KivocDynamicTechnology</Text>
              <Text style={styles.aboutVersion}>Sumbandila v1.0.0 · SDK 54 · © 2026</Text>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => navigation.replace('Login')}
              >
                <Text style={styles.logoutText}>🔓 Log Out</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 'settings' && (
          <View>
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>PREFERENCES</Text>
              <View style={styles.settingRow}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Switch value={notificationsOn} onValueChange={setNotificationsOn} trackColor={{ true: COLORS.primary }} />
              </View>
              <View style={styles.settingRow}>
                <Text style={styles.settingIcon}>🌙</Text>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: COLORS.primary }} />
              </View>
            </View>

            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>ACCOUNT</Text>
              {['Change Password', 'Two-Factor Authentication', 'Privacy Settings', 'Data & Storage'].map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.settingRowBtn}>
                  <Text style={styles.settingLabel}>{item}</Text>
                  <Text style={{ color: COLORS.textMuted }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>SUPPORT</Text>
              {['Help Centre', 'Contact Support', 'Report a Bug', 'Rate the App'].map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.settingRowBtn}>
                  <Text style={styles.settingLabel}>{item}</Text>
                  <Text style={{ color: COLORS.textMuted }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>LEGAL & TRUST</Text>
              {[
                { label: 'Trust Center', screen: 'TrustCenter' },
                { label: 'Privacy Policy', screen: 'TrustCenter' },
                { label: 'Terms of Service', screen: 'TrustCenter' },
              ].map((item, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.settingRowBtn}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={{ color: COLORS.textMuted }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.logoutBtnFull} onPress={() => navigation.replace('Login')}>
              <Text style={styles.logoutTextFull}>🔓 Log Out</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: 0, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 14 },
  tabRow: { flexDirection: 'row', gap: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  tabActive: { backgroundColor: COLORS.background },
  tabText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  tabTextActive: { color: COLORS.primary, fontWeight: '800' },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  userCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: SPACING.md, ...SHADOW.medium },
  avatarCircle: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28 },
  userName: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  userEmail: { fontSize: 12, color: COLORS.textLight },
  planRow: { marginTop: 4 },
  planBadge: { fontSize: 12, color: COLORS.primary, fontWeight: '700' },
  editBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary },
  section: { marginBottom: SPACING.md },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 8 },
  newTag: { backgroundColor: COLORS.primary, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  newTagText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  cvCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, ...SHADOW.medium },
  cvHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: SPACING.md },
  cvTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  cvSub: { fontSize: 11, color: COLORS.textLight },
  applyBtn: { borderRadius: 10, overflow: 'hidden' },
  applyGrad: { paddingHorizontal: 10, paddingVertical: 7 },
  applyText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  qualTitle: { fontSize: 12, fontWeight: '700', color: COLORS.textLight, letterSpacing: 1, marginBottom: 8 },
  qualRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderTopWidth: 1, borderTopColor: COLORS.border },
  qualCheck: { fontSize: 16, fontWeight: '900', width: 20 },
  qualLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  qualYear: { fontSize: 11, color: COLORS.textLight },
  verifiedChip: { backgroundColor: '#D5F5E3', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  verifiedChipText: { fontSize: 11, color: '#27AE60', fontWeight: '700' },
  verifyNowBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  verifyNowText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  shareCV: { marginTop: 12, backgroundColor: COLORS.background, borderRadius: RADIUS.md, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  shareCVText: { color: COLORS.primary, fontWeight: '700', fontSize: 14 },
  cpdCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, ...SHADOW.medium },
  cpdProgress: { alignItems: 'center', marginBottom: SPACING.md },
  cpdPoints: { fontSize: 36, fontWeight: '900', color: COLORS.primary },
  cpdLabel: { fontSize: 12, color: COLORS.textLight, marginBottom: 8 },
  progressBar: { width: '100%', height: 8, backgroundColor: COLORS.border, borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: COLORS.primary, borderRadius: 4 },
  cpdItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9, borderTopWidth: 1, borderTopColor: COLORS.border },
  cpdIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  cpdItemLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  cpdItemDate: { fontSize: 11, color: COLORS.textLight },
  cpdPts: { backgroundColor: '#D5F5E3', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  cpdPtsText: { color: '#27AE60', fontSize: 12, fontWeight: '800' },
  addCpdBtn: { marginTop: 10, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 10, alignItems: 'center', borderStyle: 'dashed' },
  addCpdText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  subCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...SHADOW.small },
  subLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  subIcon: { fontSize: 26 },
  subPlan: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  subRenew: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  quickItem: { backgroundColor: '#fff', borderRadius: RADIUS.md, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  quickLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  aboutCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.xl, alignItems: 'center', ...SHADOW.small, marginBottom: SPACING.md },
  aboutLogo: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  aboutTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  aboutSub: { fontSize: 12, color: COLORS.accent, marginTop: 4, fontWeight: '600' },
  aboutVersion: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  logoutBtn: { marginTop: 16, borderWidth: 1.5, borderColor: COLORS.danger, borderRadius: RADIUS.md, paddingHorizontal: 24, paddingVertical: 10 },
  logoutText: { color: COLORS.danger, fontWeight: '700', fontSize: 14 },
  settingsSection: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.small },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  settingRowBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderTopWidth: 1, borderTopColor: COLORS.border },
  settingIcon: { fontSize: 20 },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  logoutBtnFull: { backgroundColor: '#FDEDEC', borderRadius: RADIUS.xl, padding: SPACING.md, alignItems: 'center', marginBottom: 12 },
  logoutTextFull: { color: COLORS.danger, fontWeight: '800', fontSize: 15 },
});
