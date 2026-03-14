import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const APPS = [
  { id: 'seta', name: 'SETA Grant', status: 'Submitted', color: '#27AE60', date: 'Oct 15, 2025', amount: 'R45,000', progress: 90 },
  { id: 'corp1', name: 'Nedbank Corporate Grant', status: 'Under Review', color: '#F39C12', date: 'Nov 02, 2025', amount: 'R120,000', progress: 55 },
  { id: 'corp2', name: 'Standard Bank CSR', status: 'Under Review', color: '#F39C12', date: 'Nov 28, 2025', amount: 'R80,000', progress: 45 },
  { id: 'nef', name: 'NEF Enterprise Grant', status: 'Approved', color: '#1565C0', date: 'Dec 01, 2025', amount: 'R500,000', progress: 100 },
  { id: 'idc', name: 'IDC Growth Fund', status: 'Draft', color: '#9B59B6', date: '—', amount: 'R1,200,000', progress: 20 },
];

const STATUS_CONFIG = {
  'Submitted': { bg: '#D5F5E3', text: '#1E8449', icon: '📤' },
  'Under Review': { bg: '#FEF9E7', text: '#B7770D', icon: '🔍' },
  'Approved': { bg: '#EBF5FB', text: '#1565C0', icon: '✅' },
  'Draft': { bg: '#F4F6F7', text: '#626567', icon: '📝' },
};

const COMPLIANCE = [
  { label: 'CIPC Registration', ok: true },
  { label: 'Tax Clearance', ok: true },
  { label: 'BBBEE Certificate', ok: false, warn: 'Expires in 30 days' },
  { label: 'UIF Registration', ok: true },
];

export default function ApplicationTrackerScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('applications');
  const total = APPS.length;
  const submitted = APPS.filter(a => a.status !== 'Draft').length;
  const approved = APPS.filter(a => a.status === 'Approved').length;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Application Tracker</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Total', value: total, color: '#fff' },
            { label: 'Active', value: submitted, color: COLORS.secondary },
            { label: 'Approved', value: approved, color: '#2ECC71' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {['applications', 'compliance'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'applications' ? '📋 Applications' : '✅ Compliance'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {activeTab === 'applications' && (
          <>
            <Text style={styles.sectionTitle}>APPLICATIONS · STATUS</Text>
            {APPS.map((app) => {
              const config = STATUS_CONFIG[app.status];
              return (
                <View key={app.id} style={styles.appCard}>
                  <View style={styles.appTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.appName}>{app.name}</Text>
                      <Text style={styles.appAmount}>{app.amount}</Text>
                      <Text style={styles.appDate}>Applied: {app.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
                      <Text style={{ fontSize: 14 }}>{config.icon}</Text>
                      <Text style={[styles.statusText, { color: config.text }]}>{app.status}</Text>
                    </View>
                  </View>

                  {/* Progress */}
                  <View style={styles.progressSection}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${app.progress}%`, backgroundColor: config.text }
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressPct, { color: config.text }]}>{app.progress}%</Text>
                  </View>

                  <View style={styles.appActions}>
                    <TouchableOpacity style={styles.viewBtn}>
                      <Text style={styles.viewBtnText}>View Details</Text>
                    </TouchableOpacity>
                    {app.status === 'Draft' && (
                      <TouchableOpacity style={styles.continueBtn}>
                        <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.continueGrad}>
                          <Text style={styles.continueBtnText}>Continue ›</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('FundingDetail')}
            >
              <Text style={styles.addBtnText}>+ New Grant Application</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'compliance' && (
          <>
            <Text style={styles.sectionTitle}>COMPLIANCE OVERVIEW</Text>
            <View style={styles.scoreCard}>
              <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.scoreGrad}>
                <Text style={styles.scorePct}>87%</Text>
                <Text style={styles.scoreLabel}>Compliance Score</Text>
                <Text style={styles.scoreSub}>2 items require attention</Text>
              </LinearGradient>
            </View>
            {COMPLIANCE.map((item, idx) => (
              <View key={idx} style={[styles.complianceItem, !item.ok && styles.complianceWarn]}>
                <Text style={{ fontSize: 20 }}>{item.ok ? '✅' : '⚠️'}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.complianceLabel}>{item.label}</Text>
                  {item.warn && <Text style={styles.complianceWarnText}>{item.warn}</Text>}
                </View>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: item.ok ? COLORS.background : COLORS.primary }]}>
                  <Text style={[styles.actionBtnText, { color: item.ok ? COLORS.textLight : '#fff' }]}>
                    {item.ok ? 'View' : 'Renew →'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: 0, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 10 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 14 },
  statsRow: { flexDirection: 'row', gap: 4, marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: RADIUS.md, padding: 10, alignItems: 'center' },
  statValue: { fontSize: 26, fontWeight: '900' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 },
  tabRow: { flexDirection: 'row', gap: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  tabActive: { backgroundColor: COLORS.background },
  tabText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  tabTextActive: { color: COLORS.primary, fontWeight: '800' },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 10 },
  appCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.medium },
  appTop: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  appName: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  appAmount: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginTop: 2 },
  appDate: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start' },
  statusText: { fontSize: 11, fontWeight: '800' },
  progressSection: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  progressBar: { flex: 1, height: 6, backgroundColor: COLORS.border, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  progressPct: { fontSize: 12, fontWeight: '800', width: 36, textAlign: 'right' },
  appActions: { flexDirection: 'row', gap: 10 },
  viewBtn: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingVertical: 9, alignItems: 'center' },
  viewBtnText: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  continueBtn: { flex: 1, borderRadius: RADIUS.md, overflow: 'hidden' },
  continueGrad: { paddingVertical: 9, alignItems: 'center' },
  continueBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  addBtn: { borderRadius: RADIUS.xl, borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed', paddingVertical: 16, alignItems: 'center', marginBottom: SPACING.md },
  addBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 15 },
  scoreCard: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: 14, ...SHADOW.medium },
  scoreGrad: { padding: SPACING.xl, alignItems: 'center' },
  scorePct: { color: '#fff', fontSize: 52, fontWeight: '900' },
  scoreLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  scoreSub: { color: COLORS.secondary, fontSize: 12, marginTop: 4 },
  complianceItem: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  complianceWarn: { borderLeftWidth: 4, borderLeftColor: COLORS.warning },
  complianceLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  complianceWarnText: { fontSize: 12, color: COLORS.warning, marginTop: 2, fontWeight: '600' },
  actionBtn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  actionBtnText: { fontSize: 12, fontWeight: '700' },
});
