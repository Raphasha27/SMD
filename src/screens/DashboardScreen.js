import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Dimensions, StatusBar, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const DARK = '#0B1220';
const CARD = '#1E293B';
const BORDER = '#2D3F55';
const TEXT = '#F1F5F9';
const MUTED = '#64748B';
const BLUE = '#3B82F6';
const PURPLE = '#8B5CF6';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
const PINK = '#EC4899';

// ─── Data ───────────────────────────────────────────────
const categories = [
  { icon: '🩺', label: 'Doctors',   screen: 'MedicalVerification',    color: GREEN  },
  { icon: '🎓', label: 'Schools',   screen: 'EducationVerification',   color: BLUE   },
  { icon: '⚖️', label: 'Lawyers',   screen: 'LegalVerification',       color: PURPLE },
  { icon: '🏢', label: 'Companies', screen: 'Compliance',              color: AMBER  },
  { icon: '💼', label: 'Jobs',      screen: 'CareerHubDirect',         color: PINK   },
  { icon: '📜', label: 'Certs',     screen: 'AccreditedTraining',      color: '#06B6D4' },
  { icon: '🏅', label: 'Badges',    screen: 'VendorDirectory',         color: '#F97316' },
  { icon: '🤲', label: 'CSR',       screen: 'Support',                 color: '#14B8A6' },
];

const featured = [
  {
    title: '🔥 Verify Any Professional',
    sub: 'Trusted by 50,000+ South Africans',
    cta: 'Verify Now',
    screen: 'VerificationSelection',
    colors: [BLUE, PURPLE],
  },
  {
    title: '💎 Go Premium Today',
    sub: 'Unlimited verifications & tools',
    cta: 'R149/mo',
    screen: 'Subscription',
    colors: ['#059669', '#10B981'],
  },
  {
    title: '🤖 Ask Sumbandila AI',
    sub: 'Your personal verification assistant',
    cta: 'Chat Now',
    screen: 'AISupport',
    colors: [PURPLE, PINK],
  },
];

const trending = [
  { icon: '🩺', label: 'Verify a Doctor',               screen: 'MedicalVerification',  users: '12.4k', rating: '4.9' },
  { icon: '🎓', label: 'Check School Accreditation',    screen: 'EducationVerification', users: '9.1k',  rating: '4.8' },
  { icon: '⚖️', label: 'Legal Practitioner Check',      screen: 'LegalVerification',     users: '5.7k',  rating: '4.7' },
  { icon: '🏢', label: 'Company Compliance Check',      screen: 'Compliance',            users: '3.2k',  rating: '4.6' },
];

const appCards = [
  {
    icon: '🤝', title: 'Talent Marketplace',
    desc: 'Find verified professionals for hire',
    rating: '4.8', users: '8.2k',
    screen: 'CareerHubDirect', tag: 'NEW',
    colors: ['#059669', '#047857'],
  },
  {
    icon: '📋', title: 'B2B Procurement',
    desc: 'Connect with trusted suppliers',
    rating: '4.7', users: '4.5k',
    screen: 'B2BProcurement', tag: 'NEW',
    colors: [BLUE, '#1D4ED8'],
  },
  {
    icon: '🏛️', title: 'Grants & Funding',
    desc: 'DTI · NEF · Government opportunities',
    rating: '4.9', users: '11k',
    screen: 'FundingDetail', tag: null,
    colors: ['#DC2626', '#B91C1C'],
  },
];

// ─── Component ──────────────────────────────────────────
export default function DashboardScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const scrollRef = useRef(null);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return '☀️ Good morning';
    if (h < 17) return '🌤️ Good afternoon';
    return '🌙 Good evening';
  };

  const navigate = (screen) => {
    if (screen === 'CareerHubDirect') navigation.navigate('Career Hub');
    else if (screen === 'Support') navigation.navigate('Biz Tools');
    else navigation.navigate(screen);
  };

  const filtered = search.trim()
    ? [...categories, ...trending].filter(i =>
        i.label.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={DARK} />

      {/* ── TOP HEADER ── */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Text style={s.greeting}>{getGreeting()}</Text>
          <Text style={s.headerSub}>Discover trusted services</Text>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity style={s.iconBtn} onPress={() => navigation.navigate('ApplicationTracker')}>
            <Text style={s.iconEmoji}>🔔</Text>
            <View style={s.dot} />
          </TouchableOpacity>
          <TouchableOpacity style={s.avatarBtn} onPress={() => navigation.navigate('Profile')}>
            <Text style={s.avatarEmoji}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── SEARCH ── */}
      <View style={s.searchWrap}>
        <View style={s.searchBar}>
          <Text style={s.searchIco}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Search doctors, schools, companies..."
            placeholderTextColor={MUTED}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: MUTED, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* ── SEARCH RESULTS ── */}
        {filtered && (
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <Text style={s.sectionLabel}>Results for "{search}"</Text>
            {filtered.map((item, i) => (
              <TouchableOpacity key={i} style={s.searchResult} onPress={() => navigate(item.screen)}>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                <Text style={s.searchResultText}>{item.label}</Text>
                <Text style={{ color: MUTED, fontSize: 18 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!filtered && <>

          {/* ── FEATURED BANNER CAROUSEL ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={s.featuredScroll}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {featured.map((f, i) => (
              <TouchableOpacity key={i} onPress={() => navigate(f.screen)} activeOpacity={0.92}>
                <LinearGradient colors={f.colors} style={s.featuredCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <View style={s.featuredLive}>
                    <View style={s.liveDot} />
                    <Text style={s.liveText}>LIVE</Text>
                  </View>
                  <Text style={s.featuredTitle}>{f.title}</Text>
                  <Text style={s.featuredSub}>{f.sub}</Text>
                  <View style={s.featuredBtn}>
                    <Text style={s.featuredBtnText}>{f.cta} →</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── CATEGORY ICON GRID ── */}
          <View style={s.section}>
            <View style={s.sectionRow}>
              <Text style={s.sectionLabel}>CATEGORIES</Text>
              <TouchableOpacity onPress={() => navigation.navigate('VerificationSelection')}>
                <Text style={s.seeAll}>See all ›</Text>
              </TouchableOpacity>
            </View>
            <View style={s.grid}>
              {categories.map((cat, i) => (
                <TouchableOpacity key={i} style={s.gridItem} onPress={() => navigate(cat.screen)} activeOpacity={0.8}>
                  <View style={[s.gridIconWrap, { backgroundColor: cat.color + '22' }]}>
                    <Text style={s.gridIcon}>{cat.icon}</Text>
                  </View>
                  <Text style={s.gridLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── TRENDING NOW ── */}
          <View style={s.section}>
            <View style={s.sectionRow}>
              <Text style={s.sectionLabel}>🔥 TRENDING NOW</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16, paddingHorizontal: 16 }}>
              {trending.map((t, i) => (
                <TouchableOpacity key={i} style={s.trendCard} onPress={() => navigate(t.screen)} activeOpacity={0.85}>
                  <Text style={s.trendIcon}>{t.icon}</Text>
                  <Text style={s.trendLabel}>{t.label}</Text>
                  <View style={s.trendMeta}>
                    <Text style={s.trendRating}>⭐ {t.rating}</Text>
                    <Text style={s.trendUsers}>{t.users} users</Text>
                  </View>
                  <View style={s.trendOpenBtn}>
                    <Text style={s.trendOpenText}>Open →</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* ── APP CARDS ── */}
          <View style={s.section}>
            <Text style={s.sectionLabel}>✨ FEATURED APPS</Text>
            {appCards.map((app, i) => (
              <TouchableOpacity key={i} style={s.appCard} onPress={() => navigate(app.screen)} activeOpacity={0.88}>
                <LinearGradient colors={app.colors} style={s.appIconGrad}>
                  <Text style={{ fontSize: 26 }}>{app.icon}</Text>
                </LinearGradient>
                <View style={s.appInfo}>
                  <View style={s.appTitleRow}>
                    <Text style={s.appTitle}>{app.title}</Text>
                    {app.tag && <View style={s.appTag}><Text style={s.appTagText}>{app.tag}</Text></View>}
                  </View>
                  <Text style={s.appDesc}>{app.desc}</Text>
                  <View style={s.appMeta}>
                    <Text style={s.appRating}>⭐ {app.rating}</Text>
                    <Text style={s.appUsers}> · {app.users} users</Text>
                  </View>
                </View>
                <TouchableOpacity style={s.openBtn} onPress={() => navigate(app.screen)}>
                  <Text style={s.openBtnText}>Open</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── TRUST BADGES ── */}
          <View style={[s.section, s.trustRow]}>
            {[
              { icon: '🏛️', label: 'Govt Verified' },
              { icon: '🔒', label: 'Secure 256-bit' },
              { icon: '📜', label: 'POPIA Compliant' },
              { icon: '🟢', label: 'Live Status' },
            ].map((b, i) => (
              <View key={i} style={s.trustBadge}>
                <Text style={{ fontSize: 20 }}>{b.icon}</Text>
                <Text style={s.trustLabel}>{b.label}</Text>
              </View>
            ))}
          </View>

          {/* ── AI ASSISTANT ── */}
          <View style={{ paddingHorizontal: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate('AISupport')} activeOpacity={0.9}>
              <LinearGradient colors={[PURPLE, PINK]} style={s.aiCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View style={s.aiLeft}>
                  <Text style={{ fontSize: 28 }}>🤖</Text>
                  <View style={{ marginLeft: 14 }}>
                    <Text style={s.aiTitle}>Sumbandila AI</Text>
                    <Text style={s.aiSub}>Ask anything about verifications</Text>
                  </View>
                </View>
                <View style={s.aiChip}>
                  <Text style={s.aiChipText}>Chat →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </>}
      </ScrollView>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12,
  },
  headerLeft: {},
  greeting: { color: TEXT, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  headerSub: { color: MUTED, fontSize: 13, fontWeight: '500', marginTop: 2 },
  headerRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: CARD, justifyContent: 'center', alignItems: 'center' },
  iconEmoji: { fontSize: 18 },
  dot: { position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: DARK },
  avatarBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: BLUE + '33', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: BLUE },
  avatarEmoji: { fontSize: 18 },

  // Search
  searchWrap: { paddingHorizontal: 16, paddingBottom: 16 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: CARD, borderRadius: 30,
    paddingHorizontal: 18, height: 50,
    borderWidth: 1, borderColor: BORDER,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 5,
  },
  searchIco: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, color: TEXT, fontSize: 14, fontWeight: '500' },

  // Search results
  searchResult: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: CARD, borderRadius: 14, padding: 14, marginBottom: 8,
  },
  searchResultText: { flex: 1, color: TEXT, fontSize: 15, fontWeight: '600' },

  // Featured
  featuredScroll: { marginBottom: 28 },
  featuredCard: {
    width: width - 56, borderRadius: 24, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10,
  },
  featuredLive: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80' },
  liveText: { color: '#4ADE80', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  featuredTitle: { color: '#fff', fontSize: 22, fontWeight: '900', letterSpacing: -0.5, marginBottom: 6 },
  featuredSub: { color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: '500', marginBottom: 20 },
  featuredBtn: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  featuredBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  // Sections
  section: { paddingHorizontal: 16, marginBottom: 32 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionLabel: { color: MUTED, fontSize: 12, fontWeight: '900', letterSpacing: 1.5, marginBottom: 14 },
  seeAll: { color: BLUE, fontSize: 13, fontWeight: '700' },

  // Category Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItem: { width: (width - 32 - 30) / 4, alignItems: 'center' },
  gridIconWrap: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  gridIcon: { fontSize: 26 },
  gridLabel: { color: TEXT, fontSize: 11, fontWeight: '700', textAlign: 'center' },

  // Trending
  trendCard: {
    backgroundColor: CARD, borderRadius: 20, padding: 18,
    marginRight: 12, width: 190,
    borderWidth: 1, borderColor: BORDER,
  },
  trendIcon: { fontSize: 30, marginBottom: 10 },
  trendLabel: { color: TEXT, fontSize: 13, fontWeight: '800', marginBottom: 8, lineHeight: 18 },
  trendMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  trendRating: { color: AMBER, fontSize: 12, fontWeight: '700' },
  trendUsers: { color: MUTED, fontSize: 11, fontWeight: '600' },
  trendOpenBtn: { backgroundColor: BLUE + '22', borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  trendOpenText: { color: BLUE, fontSize: 13, fontWeight: '800' },

  // App Cards
  appCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: CARD, borderRadius: 20, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: BORDER,
  },
  appIconGrad: { width: 58, height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  appInfo: { flex: 1 },
  appTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  appTitle: { color: TEXT, fontSize: 15, fontWeight: '800' },
  appTag: { backgroundColor: GREEN + '22', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  appTagText: { color: GREEN, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  appDesc: { color: MUTED, fontSize: 12, fontWeight: '500', marginBottom: 6 },
  appMeta: { flexDirection: 'row', alignItems: 'center' },
  appRating: { color: AMBER, fontSize: 12, fontWeight: '700' },
  appUsers: { color: MUTED, fontSize: 11 },
  openBtn: { backgroundColor: BLUE, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  openBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' },

  // Trust Badges
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  trustBadge: {
    width: (width - 52) / 4, backgroundColor: CARD,
    borderRadius: 14, padding: 12, alignItems: 'center',
    borderWidth: 1, borderColor: BORDER,
  },
  trustLabel: { color: MUTED, fontSize: 9, fontWeight: '700', marginTop: 5, textAlign: 'center' },

  // AI
  aiCard: { borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  aiLeft: { flexDirection: 'row', alignItems: 'center' },
  aiTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  aiSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  aiChip: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  aiChipText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
