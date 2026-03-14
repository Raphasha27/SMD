import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const { width } = Dimensions.get('window');

const verifyCards = [
  { icon: '🎓', label: 'Schools/\nColleges', screen: 'EducationVerification', color: '#1565C0' },
  { icon: '🩺', label: 'Doctors', screen: 'MedicalVerification', color: '#27AE60' },
  { icon: '⚖️', label: 'Lawyers', screen: 'LegalVerification', color: '#8E44AD' },
  { icon: '📜', label: 'Accredited\nTraining', screen: 'AccreditedTraining', color: '#E67E22', isNew: true },
];

const opportunityCards = [
  { icon: '🤝', label: 'Job & Talent\nMarketplace', screen: 'CareerHubDirect', color: '#0D9E87', isNew: true },
  { icon: '📋', label: 'B2B\nProcurement\n& Tenders', screen: 'B2BProcurement', color: '#0A2463', isNew: true },
  { icon: '🏛️', label: 'Government\nGrants', screen: 'FundingDetail', color: '#C0392B', logos: 'dti · NEF · IDC' },
  { icon: '🏢', label: 'SME\nCompliance\nPortal', screen: 'Compliance', color: '#E67E22', isNew: true },
  { icon: '🏅', label: 'Digital Trust\nBadges', screen: 'VendorDirectory', color: '#1565C0', isNew: true },
  { icon: '🤲', label: 'Corporate\nCSR', screen: 'Support', color: '#2C3E50' },
];

export default function DashboardScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const navigate = (screen) => {
    if (screen === 'CareerHubDirect') {
      navigation.getParent()?.navigate('Career Hub');
    } else if (screen === 'Support') {
      navigation.getParent()?.navigate('Biz Tools');
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good day 👋</Text>
            <Text style={styles.headerTitle}>Main Dashboard</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>❓</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('ApplicationTracker')}>
              <Text style={styles.iconText}>🔔</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search institutions, doctors, lawyers…"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* Global Talent Marketplace Banner */}
        <TouchableOpacity style={styles.topBanner} onPress={() => navigation.getParent()?.navigate('Career Hub')} activeOpacity={0.9}>
          <LinearGradient colors={['#0A7163', '#0D9E87']} style={styles.topBannerGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.topBannerStar}>⭐</Text>
            <Text style={styles.topBannerText}>
              <Text style={{ fontWeight: '900' }}>**NEW: Global Verified Talent Marketplace</Text>
              {' '}- Find Accredited Pros Instantly.
            </Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>›</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* VERIFY INSTANTLY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VERIFY INSTANTLY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {verifyCards.map((card) => (
              <TouchableOpacity
                key={card.label}
                style={styles.verifyCard}
                onPress={() => navigation.navigate(card.screen)}
                activeOpacity={0.85}
              >
                {card.isNew && (
                  <View style={styles.newBadge}><Text style={styles.newText}>NEW</Text></View>
                )}
                <View style={[styles.verifyIconBox, { backgroundColor: card.color + '18' }]}>
                  <Text style={styles.verifyIcon}>{card.icon}</Text>
                </View>
                <Text style={styles.verifyLabel}>{card.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ACCESS OPPORTUNITIES & SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCESS OPPORTUNITIES & SUPPORT</Text>
          <View style={styles.oppGrid}>
            {opportunityCards.map((card) => (
              <TouchableOpacity
                key={card.label}
                style={styles.oppCard}
                onPress={() => navigate(card.screen)}
                activeOpacity={0.85}
              >
                {card.isNew && (
                  <View style={styles.newBadgeCard}><Text style={styles.newText}>NEW</Text></View>
                )}
                <View style={[styles.oppIcon, { backgroundColor: card.color + '18' }]}>
                  <Text style={{ fontSize: 24 }}>{card.icon}</Text>
                </View>
                <Text style={styles.oppLabel}>{card.label}</Text>
                {card.logos && <Text style={styles.oppLogos}>{card.logos}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Get Sumbandila Pro */}
        <TouchableOpacity style={styles.proBanner} onPress={() => navigation.navigate('Subscription')} activeOpacity={0.9}>
          <LinearGradient colors={['#0A2463', '#1A237E']} style={styles.proBannerGrad}>
            <View style={styles.proLeft}>
              <Text style={styles.proCrown}>👑</Text>
              <View>
                <Text style={styles.proTitle}>Get Sumbandila Pro</Text>
                <Text style={styles.proSub}>Individual R49/mo · Business R299/mo · Enterprise</Text>
              </View>
            </View>
            <Text style={{ color: COLORS.secondary, fontSize: 22 }}>›</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* AI + Financial Services Row */}
        <View style={styles.rowCards}>
          <TouchableOpacity style={styles.aiCard} onPress={() => navigation.navigate('AISupport')}>
            <LinearGradient colors={['#1A237E', '#283593']} style={styles.miniGrad}>
              <Text style={styles.miniIcon}>🤖</Text>
              <Text style={styles.miniTitle}>AI Assistant</Text>
              <Text style={styles.miniSub}>Ask anything</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finCard} onPress={() => navigation.navigate('FundingDetail', { type: 'financial' })}>
            <LinearGradient colors={['#0D9E87', '#0A7163']} style={styles.miniGrad}>
              <Text style={styles.miniIcon}>🛡️</Text>
              <Text style={styles.miniTitle}>Financial\nServices</Text>
              <Text style={styles.miniSub}>Insurance & Grants</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recent Verifications */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>RECENT VERIFICATIONS</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See all ›</Text></TouchableOpacity>
          </View>
          {[
            { name: 'St Stithians College', type: 'Education', status: 'VERIFIED', icon: '🎓' },
            { name: 'Dr. Sipho Nkosi', type: 'Medical', status: 'VERIFIED', icon: '🩺' },
            { name: 'Adv. Zanele Mokoena', type: 'Legal', status: 'UNABLE TO VERIFY', icon: '⚖️' },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.recentCard}
              onPress={() => navigation.navigate('VerificationResult', { name: item.name, type: item.type, status: item.status })}
            >
              <View style={styles.recentLeft}>
                <View style={styles.recentIconBox}><Text style={{ fontSize: 20 }}>{item.icon}</Text></View>
                <View>
                  <Text style={styles.recentName}>{item.name}</Text>
                  <Text style={styles.recentType}>{item.type}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.status === 'VERIFIED' ? '#D5F5E3' : '#FDEDEC' }]}>
                <Text style={[styles.statusText, { color: item.status === 'VERIFIED' ? '#27AE60' : '#E74C3C' }]}>
                  {item.status === 'VERIFIED' ? '✓' : '✗'} {item.status}
                </Text>
              </View>
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
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  greeting: { color: 'rgba(255,255,255,0.65)', fontSize: 12 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 17 },
  badge: { position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.danger, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: '700' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 9, gap: 8 },
  searchIcon: { fontSize: 15 },
  searchInput: { flex: 1, color: '#fff', fontSize: 13 },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.sm },
  section: { marginBottom: SPACING.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 8 },
  seeAll: { fontSize: 12, color: COLORS.accent, fontWeight: '600' },
  topBanner: { borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: 12, ...SHADOW.small },
  topBannerGrad: { paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  topBannerStar: { fontSize: 16 },
  topBannerText: { flex: 1, color: '#fff', fontSize: 12 },
  verifyCard: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 12, alignItems: 'center', marginRight: 10, width: 86, ...SHADOW.small },
  newBadge: { position: 'absolute', top: -6, right: -6, backgroundColor: COLORS.danger, borderRadius: 8, paddingHorizontal: 5, paddingVertical: 2, zIndex: 1 },
  newText: { color: '#fff', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  verifyIconBox: { width: 48, height: 48, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  verifyIcon: { fontSize: 22 },
  verifyLabel: { fontSize: 10.5, fontWeight: '600', color: COLORS.text, textAlign: 'center' },
  oppGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  oppCard: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 12, width: (width - SPACING.md * 2 - 18) / 3, ...SHADOW.small, minHeight: 105 },
  newBadgeCard: { position: 'absolute', top: 6, right: 6, backgroundColor: COLORS.danger, borderRadius: 6, paddingHorizontal: 4, paddingVertical: 2 },
  oppIcon: { width: 42, height: 42, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginBottom: 7 },
  oppLabel: { fontSize: 10.5, fontWeight: '700', color: COLORS.text, lineHeight: 14 },
  oppLogos: { fontSize: 9, color: COLORS.textLight, marginTop: 2, fontWeight: '600' },
  proBanner: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.md, ...SHADOW.medium },
  proBannerGrad: { padding: SPACING.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  proLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  proCrown: { fontSize: 28 },
  proTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  proSub: { color: COLORS.secondary, fontSize: 11, marginTop: 2 },
  rowCards: { flexDirection: 'row', gap: 10, marginBottom: SPACING.md },
  aiCard: { flex: 1, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOW.small },
  finCard: { flex: 1, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOW.small },
  miniGrad: { padding: SPACING.md, alignItems: 'center', minHeight: 90, justifyContent: 'center' },
  miniIcon: { fontSize: 26, marginBottom: 6 },
  miniTitle: { color: '#fff', fontSize: 13, fontWeight: '800', textAlign: 'center' },
  miniSub: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 2, textAlign: 'center' },
  recentCard: { backgroundColor: '#fff', borderRadius: RADIUS.md, padding: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, ...SHADOW.small },
  recentLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  recentIconBox: { width: 40, height: 40, borderRadius: 11, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  recentName: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  recentType: { fontSize: 11, color: COLORS.textLight },
  statusBadge: { borderRadius: RADIUS.full, paddingHorizontal: 9, paddingVertical: 4 },
  statusText: { fontSize: 10, fontWeight: '700' },
});
