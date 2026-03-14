import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const { width } = Dimensions.get('window');

const TENDERS = [
  {
    company: 'Eskom - IT Services',
    category: 'IT Services',
    deadline: '2h',
    urgent: true,
    requirements: ['CIPC Registered', 'Tax Clearance', 'BBBEE Level 1-4', 'ISO 27001'],
    value: 'R2.5M – R8M',
    preVetted: 3,
  },
  {
    company: 'Transnet - Civil Works',
    category: 'Civil Engineering',
    deadline: '3 days',
    urgent: false,
    requirements: ['CIPC Registered', 'ECSA Certification', 'BBBEE Level 1-3'],
    value: 'R500k – R2M',
    preVetted: 7,
  },
  {
    company: 'Dept of Health - PPE Supply',
    category: 'Medical Supplies',
    deadline: '5 days',
    urgent: false,
    requirements: ['CIPC Registered', 'SAHPRA Approval', 'Tax Clearance'],
    value: 'R1M – R5M',
    preVetted: 2,
  },
];

const B2B_SUPPLIERS = [
  { name: 'TechBuild SA (Pty) Ltd', category: 'IT Services', bbbee: 'Level 2', cipc: '2019/123456/07', verified: true, rating: 4.8 },
  { name: 'GreenBuild Engineers', category: 'Civil Engineering', bbbee: 'Level 1', cipc: '2017/654321/07', verified: true, rating: 4.9 },
  { name: 'MediSupply Africa', category: 'Medical Supplies', bbbee: 'Level 3', cipc: '2020/789012/07', verified: true, rating: 4.6 },
];

export default function BusinessToolsScreen({ navigation }) {
  const [supplierSearch, setSupplierSearch] = useState('');
  const [activeTab, setActiveTab] = useState('tenders');

  const filteredSuppliers = B2B_SUPPLIERS.filter(s =>
    s.name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1A237E']} style={styles.header}>
        <Text style={styles.headerTitle}>Tender & Vendor Portal</Text>
        <Text style={styles.headerSub}>B2B Procurement · Compliance · Digital Badges</Text>
        <View style={styles.tabRow}>
          {['tenders', 'suppliers', 'compliance', 'badges'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'tenders' ? '📋 Tenders' : tab === 'suppliers' ? '🏢 Suppliers' : tab === 'compliance' ? '✅ Compliance' : '🏅 Badges'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* Open Tenders Tab */}
        {activeTab === 'tenders' && (
          <View>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>OPEN TENDERS</Text>
              <View style={styles.newTagGreen}><Text style={styles.newTagText}>NEW</Text></View>
            </View>

            {TENDERS.map((tender, idx) => (
              <View key={idx} style={styles.tenderCard}>
                <View style={styles.tenderHeader}>
                  <View style={styles.tenderLeft}>
                    <Text style={styles.tenderCompany}>{tender.company}</Text>
                    <Text style={styles.tenderCategory}>{tender.category}</Text>
                  </View>
                  <View style={[styles.deadlineBadge, tender.urgent && styles.deadlineUrgent]}>
                    <Text style={[styles.deadlineText, tender.urgent && styles.deadlineTextUrgent]}>
                      ⏰ {tender.deadline}
                    </Text>
                  </View>
                </View>

                <Text style={styles.tenderValue}>Value: {tender.value}</Text>

                <View style={styles.requirementsRow}>
                  {tender.requirements.map((req, ri) => (
                    <View key={ri} style={styles.reqChip}>
                      <Text style={styles.reqText}>{req}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.preVettedRow}>
                  <Text style={styles.preVettedText}>
                    ⚡ {tender.preVetted} Pre-Vetted Suppliers Auto-Matched
                  </Text>
                </View>

                <TouchableOpacity style={styles.applyBtn}>
                  <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.applyGrad}>
                    <Text style={styles.applyText}>Apply Tender</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}

            {/* Verified HR */}
            <View style={styles.hrBox}>
              <View style={styles.hrHeader}>
                <Text style={styles.hrTitle}>🏢 Verified HR</Text>
                <View style={styles.newTagBlue}><Text style={styles.newTagBlueText}>NEW</Text></View>
              </View>
              <Text style={styles.hrSub}>Recruitment · Background Checks · Onboarding Tools</Text>
              {[
                { icon: '🔎', t: 'Recruitment Portal' },
                { icon: '🛡️', t: 'Background Checks' },
                { icon: '📋', t: 'Onboarding Tools' },
              ].map((item, i) => (
                <TouchableOpacity key={i} style={styles.hrItem}>
                  <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                  <Text style={styles.hrItemText}>{item.t}</Text>
                  <Text style={{ color: COLORS.accent }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* B2B Suppliers Tab */}
        {activeTab === 'suppliers' && (
          <View>
            <Text style={styles.sectionTitle}>VERIFIED B2B SUPPLIERS</Text>
            <View style={styles.searchBar}>
              <Text style={{ fontSize: 16 }}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search B2B Suppliers…"
                placeholderTextColor={COLORS.textMuted}
                value={supplierSearch}
                onChangeText={setSupplierSearch}
              />
            </View>
            {filteredSuppliers.map((s, idx) => (
              <View key={idx} style={styles.supplierCard}>
                <View style={styles.supplierTop}>
                  <View style={styles.supplierIconBox}>
                    <Text style={{ fontSize: 24 }}>🏢</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Text style={styles.supplierName}>{s.name}</Text>
                      {s.verified && <Text style={styles.verifiedMark}>✓</Text>}
                    </View>
                    <Text style={styles.supplierCat}>{s.category}</Text>
                    <Text style={styles.supplierCipc}>CIPC: {s.cipc}</Text>
                  </View>
                  <Text style={styles.rating}>⭐ {s.rating}</Text>
                </View>
                <View style={styles.supplierFooter}>
                  <View style={styles.bbbeeBadge}>
                    <Text style={styles.bbbeeText}>BBBEE {s.bbbee}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewProfileBtn}>
                    <Text style={styles.viewProfileText}>View Profile ›</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <View>
            <Text style={styles.sectionTitle}>SME COMPLIANCE PORTAL</Text>
            <View style={styles.complianceScore}>
              <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.scoreGrad}>
                <Text style={styles.scoreTitle}>Compliance Score</Text>
                <Text style={styles.scoreValue}>87%</Text>
                <Text style={styles.scoreSub}>Good Standing · 2 items need attention</Text>
              </LinearGradient>
            </View>
            {[
              { label: 'CIPC Registration', status: 'valid', expiry: 'Dec 2026', icon: '✅' },
              { label: 'Tax Clearance Certificate', status: 'expiring', expiry: 'Expires in 30 days', icon: '⚠️' },
              { label: 'BBBEE Certificate', status: 'expiring', expiry: 'Expires in 45 days', icon: '⚠️' },
              { label: 'VAT Registration', status: 'valid', expiry: 'Ongoing', icon: '✅' },
              { label: 'UIF/PAYE Registration', status: 'valid', expiry: 'Ongoing', icon: '✅' },
            ].map((item, idx) => (
              <View key={idx} style={[styles.complianceItem, item.status === 'expiring' && styles.complianceItemWarn]}>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.complianceLabel}>{item.label}</Text>
                  <Text style={styles.complianceExpiry}>{item.expiry}</Text>
                </View>
                <TouchableOpacity style={styles.renewBtn}>
                  <Text style={styles.renewText}>{item.status === 'expiring' ? 'Renew' : 'View'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Digital Trust Badges Tab */}
        {activeTab === 'badges' && (
          <View>
            <Text style={styles.sectionTitle}>DIGITAL TRUST BADGES</Text>
            <View style={styles.badgeHero}>
              <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.badgeHeroGrad}>
                <Text style={{ fontSize: 48 }}>🏅</Text>
                <Text style={styles.badgeHeroTitle}>Sumbandila Certified</Text>
                <Text style={styles.badgeHeroSub}>
                  Embed a verified QR badge on your website, certificates,
                  and physical premises to build instant trust.
                </Text>
                <TouchableOpacity style={styles.generateBadgeBtn}>
                  <Text style={styles.generateBadgeText}>Generate My Badge</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {[
              { icon: '🌐', title: 'Website Embed Badge', desc: 'HTML snippet with live verification QR' },
              { icon: '📱', title: 'Digital Certificate QR', desc: 'Scannable QR linked to live status' },
              { icon: '🔗', title: 'API Verification', desc: 'Let third-party apps verify your status' },
              { icon: '🏢', title: 'Physical Premise Badge', desc: 'Printable badge with offline QR verification' },
            ].map((badge, idx) => (
              <TouchableOpacity key={idx} style={styles.badgeCard}>
                <View style={styles.badgeIconBox}><Text style={{ fontSize: 26 }}>{badge.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.badgeCardTitle}>{badge.title}</Text>
                  <Text style={styles.badgeCardDesc}>{badge.desc}</Text>
                </View>
                <Text style={{ color: COLORS.accent, fontSize: 20 }}>›</Text>
              </TouchableOpacity>
            ))}
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
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 2 },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 14 },
  tabRow: { flexDirection: 'row', gap: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  tabActive: { backgroundColor: COLORS.background },
  tabText: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  tabTextActive: { color: COLORS.primary, fontWeight: '800' },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 10 },
  newTagGreen: { backgroundColor: '#D5F5E3', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  newTagText: { color: '#27AE60', fontSize: 10, fontWeight: '900' },
  newTagBlue: { backgroundColor: '#EBF5FB', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  newTagBlueText: { color: COLORS.primary, fontSize: 10, fontWeight: '900' },
  // Tenders
  tenderCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 12, ...SHADOW.medium },
  tenderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  tenderLeft: { flex: 1 },
  tenderCompany: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  tenderCategory: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  deadlineBadge: { backgroundColor: '#FEF9E7', borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4 },
  deadlineUrgent: { backgroundColor: '#FDEDEC' },
  deadlineText: { fontSize: 12, fontWeight: '700', color: COLORS.warning },
  deadlineTextUrgent: { color: COLORS.danger },
  tenderValue: { fontSize: 13, fontWeight: '700', color: COLORS.primary, marginBottom: 8 },
  requirementsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  reqChip: { backgroundColor: '#EBF5FB', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  reqText: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  preVettedRow: { backgroundColor: '#EAFAF1', borderRadius: 8, padding: 8, marginBottom: 10 },
  preVettedText: { fontSize: 12, color: '#27AE60', fontWeight: '700' },
  applyBtn: { borderRadius: RADIUS.md, overflow: 'hidden' },
  applyGrad: { paddingVertical: 12, alignItems: 'center' },
  applyText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  hrBox: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.small },
  hrHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  hrTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  hrSub: { fontSize: 12, color: COLORS.textLight, marginBottom: 12 },
  hrItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: COLORS.border },
  hrItemText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  // Suppliers
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: RADIUS.lg, paddingHorizontal: 14, paddingVertical: 10, gap: 10, marginBottom: 12, ...SHADOW.small },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.text },
  supplierCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: 10, ...SHADOW.small },
  supplierTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  supplierIconBox: { width: 50, height: 50, borderRadius: 14, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  supplierName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  verifiedMark: { backgroundColor: '#D5F5E3', color: '#27AE60', fontWeight: '900', fontSize: 11, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  supplierCat: { fontSize: 12, color: COLORS.textLight },
  supplierCipc: { fontSize: 11, color: COLORS.textMuted },
  rating: { fontSize: 14, fontWeight: '700', color: COLORS.warning },
  supplierFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bbbeeBadge: { backgroundColor: '#EBF5FB', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  bbbeeText: { fontSize: 12, color: COLORS.primary, fontWeight: '700' },
  viewProfileBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  viewProfileText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  // Compliance
  complianceScore: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: 14, ...SHADOW.medium },
  scoreGrad: { padding: SPACING.lg, alignItems: 'center' },
  scoreTitle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  scoreValue: { color: '#fff', fontSize: 52, fontWeight: '900', marginVertical: 4 },
  scoreSub: { color: COLORS.secondary, fontSize: 13, fontWeight: '600' },
  complianceItem: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  complianceItemWarn: { borderLeftWidth: 4, borderLeftColor: COLORS.warning },
  complianceLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  complianceExpiry: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  renewBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  renewText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  // Badges
  badgeHero: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: 14, ...SHADOW.medium },
  badgeHeroGrad: { padding: SPACING.xl, alignItems: 'center' },
  badgeHeroTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 8 },
  badgeHeroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 20 },
  generateBadgeBtn: { marginTop: 16, backgroundColor: COLORS.secondary, borderRadius: RADIUS.full, paddingHorizontal: 24, paddingVertical: 12 },
  generateBadgeText: { color: COLORS.primary, fontWeight: '900', fontSize: 14 },
  badgeCard: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  badgeIconBox: { width: 50, height: 50, borderRadius: 14, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  badgeCardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  badgeCardDesc: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
});
