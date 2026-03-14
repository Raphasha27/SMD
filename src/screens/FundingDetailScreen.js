import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const FUNDING_ORGS = [
  {
    id: 'nef',
    name: 'NEF Black-Owned Enterprise Grant',
    org: 'National Empowerment Fund',
    amount: 'R3,000 – R3,500',
    logo: '🏦',
    color: '#C0392B',
    deadline: 'July 2027',
    category: 'Government Grants',
    criteria: [
      'Eligible for capital grant',
      'Enterprise connected with the coastal grants',
      '51%+ Black ownership',
      'SA registered business (CIPC)',
      'Valid tax clearance certificate',
    ],
    how: 'Apply via the NEF Hub portal, complete business plan, provide CIPC registration, and submit financial statements.',
  },
  {
    id: 'idc',
    name: 'IDC SMME Growth Fund',
    org: 'Industrial Development Corporation',
    amount: 'R1M – R75M',
    logo: '🏭',
    color: '#1565C0',
    deadline: 'Rolling basis',
    category: 'Development Finance',
    criteria: [
      'Manufacturing or agro-processing',
      'SA registered business',
      'Demonstrated market demand',
      'Management capability',
      'Positive social impact',
    ],
    how: 'Submit online application at idc.co.za with your business proposal and financial projections.',
  },
  {
    id: 'dti',
    name: 'dti Enterprise Development Grant',
    org: 'Department of Trade, Industry & Competition',
    amount: 'R500k – R5M',
    logo: '🏛️',
    color: '#27AE60',
    deadline: 'Quarterly',
    category: 'Government',
    criteria: [
      'SMME with fewer than 200 employees',
      'Annual turnover under R50M',
      'BBBEE compliant',
      'SA registered for minimum 1 year',
    ],
    how: 'Register on the dti SMME Portal and complete the online application form.',
  },
];

const FINANCIAL_SERVICES = [
  {
    icon: '🛡️',
    title: 'Professional Indemnity Insurance',
    desc: 'Pre-vetted quotes for medical, legal, and engineering professionals. Leverage your verified status for competitive rates.',
    action: 'Get Quotes',
    color: '#1565C0',
  },
  {
    icon: '💼',
    title: 'Small Business Grant Management',
    desc: 'End-to-end grant application and compliance reporting. We pre-fill forms using your verified data.',
    action: 'Apply Now',
    color: '#27AE60',
  },
  {
    icon: '🏦',
    title: 'Compliance-Backed Business Loans',
    desc: 'Partner banks receive your verified compliance package automatically, speeding up loan approvals.',
    action: 'Check Eligibility',
    color: '#E67E22',
  },
];

export default function FundingDetailScreen({ navigation, route }) {
  const { type } = route?.params || {};
  const [activeTab, setActiveTab] = useState(type === 'financial' ? 'financial' : 'grants');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#C0392B']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Funding & Financial Services</Text>
        <Text style={styles.headerSub}>dti · NEF · IDC · Corporate CSR</Text>

        <View style={styles.tabRow}>
          {['grants', 'financial'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'grants' ? '🏛️ Grants' : '💼 Financial Services'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {activeTab === 'grants' && (
          <>
            <Text style={styles.sectionTitle}>CURRENT OPPORTUNITIES</Text>
            {FUNDING_ORGS.map((org) => (
              <View key={org.id} style={styles.fundCard}>
                <View style={styles.fundHeader}>
                  <View style={[styles.fundLogo, { backgroundColor: org.color + '18' }]}>
                    <Text style={{ fontSize: 26 }}>{org.logo}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fundName}>{org.name}</Text>
                    <Text style={styles.fundOrg}>{org.org}</Text>
                  </View>
                </View>

                <View style={styles.fundMeta}>
                  <View style={styles.metaChip}>
                    <Text style={styles.metaLabel}>💰 Amount</Text>
                    <Text style={styles.metaValue}>{org.amount}</Text>
                  </View>
                  <View style={styles.metaChip}>
                    <Text style={styles.metaLabel}>📅 Deadline</Text>
                    <Text style={styles.metaValue}>{org.deadline}</Text>
                  </View>
                </View>

                <Text style={styles.criteriaTitle}>Eligibility Criteria</Text>
                {org.criteria.map((c, idx) => (
                  <View key={idx} style={styles.criteriaRow}>
                    <Text style={styles.criteriaDot}>•</Text>
                    <Text style={styles.criteriaText}>{c}</Text>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => navigation.navigate('ApplicationTracker')}
                >
                  <LinearGradient colors={[org.color, org.color + 'CC']} style={styles.applyGrad}>
                    <Text style={styles.applyText}>APPLY VIA HUB SUPPORT</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {activeTab === 'financial' && (
          <>
            <Text style={styles.sectionTitle}>PRE-VETTED OPTIONS</Text>
            {FINANCIAL_SERVICES.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.finCard} activeOpacity={0.9}>
                <View style={styles.finHeader}>
                  <View style={[styles.finIcon, { backgroundColor: item.color + '18' }]}>
                    <Text style={{ fontSize: 28 }}>{item.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.finTitle}>{item.title}</Text>
                  </View>
                </View>
                <Text style={styles.finDesc}>{item.desc}</Text>
                <TouchableOpacity style={[styles.finBtn, { backgroundColor: item.color }]}>
                  <Text style={styles.finBtnText}>{item.action} ›</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>🔒 How it works</Text>
              <Text style={styles.infoText}>
                Your Sumbandila verified profile is automatically shared with our partner institutions,
                eliminating manual paperwork and drastically reducing approval times.
                All data sharing is secured and POPIA compliant.
              </Text>
            </View>
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
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 14 },
  tabRow: { flexDirection: 'row', gap: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  tabActive: { backgroundColor: COLORS.background },
  tabText: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  tabTextActive: { color: COLORS.primary, fontWeight: '800' },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 12 },
  fundCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 14, ...SHADOW.medium },
  fundHeader: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  fundLogo: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  fundName: { fontSize: 14, fontWeight: '800', color: COLORS.text, lineHeight: 19 },
  fundOrg: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  fundMeta: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metaChip: { flex: 1, backgroundColor: COLORS.background, borderRadius: RADIUS.md, padding: 10 },
  metaLabel: { fontSize: 10, color: COLORS.textLight, fontWeight: '700', letterSpacing: 0.5 },
  metaValue: { fontSize: 13, fontWeight: '800', color: COLORS.text, marginTop: 2 },
  criteriaTitle: { fontSize: 12, fontWeight: '700', color: COLORS.textLight, letterSpacing: 0.5, marginBottom: 8 },
  criteriaRow: { flexDirection: 'row', gap: 8, marginBottom: 5 },
  criteriaDot: { color: COLORS.primary, fontWeight: '900', fontSize: 16, lineHeight: 20 },
  criteriaText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 19 },
  applyBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: 12 },
  applyGrad: { paddingVertical: 13, alignItems: 'center' },
  applyText: { color: '#fff', fontWeight: '900', fontSize: 13, letterSpacing: 0.5 },
  finCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.medium },
  finHeader: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 10 },
  finIcon: { width: 54, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  finTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  finDesc: { fontSize: 13, color: COLORS.textLight, lineHeight: 20, marginBottom: 12 },
  finBtn: { borderRadius: RADIUS.md, paddingVertical: 11, alignItems: 'center' },
  finBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  infoBox: { backgroundColor: '#EBF5FB', borderRadius: RADIUS.xl, padding: SPACING.md, borderLeftWidth: 4, borderLeftColor: COLORS.accent },
  infoTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  infoText: { fontSize: 13, color: COLORS.textLight, lineHeight: 20 },
});
